/**
 * injected.js — MAIN world, document_idle
 *
 * Registers a Java hover provider AND a dot-triggered completion provider
 * with Monaco.
 *
 * How Monaco is found (priority order):
 *   1. __lc_intellisense_monaco_ready__ event from early_hook.js
 *      (fires when window.monaco is first set by the page)
 *   2. __lc_intellisense_editor_created__ event from early_hook.js
 *      (fires on each monaco.editor.create / createModel call — catches
 *       the real editor instantiation after SPA navigation)
 *   3. Polling window.monaco every 200 ms for up to 90 s
 *      (covers race conditions and pages where early_hook missed the set)
 *   4. MutationObserver on .monaco-editor DOM nodes
 *      (restarts the poller / re-registers after SPA navigation)
 *
 * Why the multi-path approach?
 *   LeetCode assigns window.monaco early (caught by early_hook) but builds
 *   the actual editor widget asynchronously during its React render cycle.
 *   registerHoverProvider() is global per-language in Monaco, so we only
 *   need to call it once — but we must wait until Monaco is truly ready
 *   (i.e. at least one editor has been created) before it reliably works.
 *
 * Completion provider — how type inference works:
 *   When the user types "someVar.", the provider reads the word before the dot
 *   and resolves it in two ways:
 *     1. Direct class name  → static members  (e.g. "Math."  → Math methods)
 *     2. Variable name      → scan upward through the file for a declaration
 *        matching patterns like "HashMap<K,V> varName", "varName = new ArrayList()",
 *        or "for (String s : list)", then look up the resolved class in JAVA_API.
 */

(function () {
  "use strict";

  // ─── Constants ─────────────────────────────────────────────────────────────
  const BRIDGE_SOURCE   = "lc-intellisense-bridge";
  const MONACO_EVENT    = "__lc_intellisense_monaco_ready__";
  const EDITOR_EVENT    = "__lc_intellisense_editor_created__";
  const LANG_ID         = "java";
  const POLL_INTERVAL   = 200;   // ms
  const POLL_MAX        = 90_000; // ms
  const LOG = (...a) => console.log("[LC Java IntelliSense]", ...a);

  // ─── State ──────────────────────────────────────────────────────────────────
  let enabled              = true;
  let monacoInstance       = null;   // set once Monaco is fully ready
  let hoverDisposable      = null;   // IDisposable for the hover provider
  let completionDisposable = null;   // IDisposable for the completion provider
  let signatureDisposable  = null;   // IDisposable for the signature help provider
  let pollerTimer          = null;
  let pollerElapsed        = 0;

  // ─── Bridge: toggle relay from bridge.js (ISOLATED world) ──────────────────
  window.addEventListener("message", (event) => {
    if (event.source !== window || event.data?.source !== BRIDGE_SOURCE) return;
    enabled = !!event.data.enabled;
    LOG("Toggle:", enabled ? "ON" : "OFF");
    if (!monacoInstance) return;
    if (!enabled) {
      hoverDisposable?.dispose();      hoverDisposable = null;
      completionDisposable?.dispose(); completionDisposable = null;
      signatureDisposable?.dispose();  signatureDisposable = null;
    } else {
      if (!hoverDisposable)      registerProvider();
      if (!completionDisposable) registerCompletionProvider();
      if (!signatureDisposable)  registerSignatureHelpProvider();
    }
  });

  // ─── getMonaco() — multi-path resolver ─────────────────────────────────────
  // Returns a Monaco object if it has the hover-provider API, otherwise null.
  function getMonaco() {
    // Path A: window.monaco global (most common on LeetCode)
    if (window.monaco?.languages?.registerHoverProvider) {
      return window.monaco;
    }

    // Path B: AMD require cache — only attempted if require exists.
    // LeetCode's AMD loader is scoped; window.require is usually absent,
    // so this rarely succeeds but costs nothing to try.
    try {
      if (typeof window.require === "function") {
        for (const id of ["vs/editor/editor.main", "monaco-editor", "monaco"]) {
          try {
            const m = window.require(id);
            if (m?.languages?.registerHoverProvider) {
              LOG("Monaco resolved via AMD require('" + id + "').");
              return m;
            }
          } catch (_) { /* not in cache */ }
        }
      }
    } catch (_) { /* require itself threw */ }

    return null;
  }

  // ─── isMonacoReady() ───────────────────────────────────────────────────────
  // Monaco may be assigned to window.monaco before any editor is created.
  // registerHoverProvider works once the internal language service is up,
  // which happens reliably after the first editor.create() call.
  // We consider Monaco "ready" when at least one editor model exists.
  function isMonacoReady(monaco) {
    if (!monaco?.languages?.registerHoverProvider) return false;
    // If models already exist, language services are running.
    const models = monaco.editor?.getModels?.() || [];
    if (models.length > 0) return true;
    // If editors exist (getEditors is available in newer Monaco builds)
    const editors = monaco.editor?.getEditors?.() || [];
    return editors.length > 0;
  }

  // ─── onMonacoReady() ───────────────────────────────────────────────────────
  function onMonacoReady(monaco) {
    if (monacoInstance) return; // idempotent
    if (!monaco?.languages?.registerHoverProvider) {
      LOG("onMonacoReady called with invalid object — ignoring.");
      return;
    }

    monacoInstance = monaco;
    stopPoller();
    LOG("Monaco confirmed ready. Registering hover provider for '" + LANG_ID + "'...");

    // Force-enable hover on any editors that already exist at activation time.
    // This covers the case where editor.create() fired before early_hook's hook
    // was applied (e.g. extension loaded mid-session).
    const existingEditors = monaco.editor?.getEditors?.() || [];
    for (const ed of existingEditors) {
      if (typeof ed.updateOptions === "function") {
        ed.updateOptions({
          hover:                      { enabled: true, delay: 300 },
          quickSuggestions:           { other: true, comments: false, strings: false },
          suggestOnTriggerCharacters: true,
          parameterHints:             { enabled: true, cycle: false }
        });
        LOG("Forced hover+suggestions+sigHelp: enabled on existing editor (lang: " + ed.getModel?.()?.getLanguageId?.() + ")");
      }
    }

    if (enabled) {
      registerProvider();
      registerCompletionProvider();
      registerSignatureHelpProvider();
    }
  }

  // ─── tryActivate() — called by poller and events ───────────────────────────
  // Checks if Monaco is truly ready and transitions to onMonacoReady.
  function tryActivate() {
    if (monacoInstance) return true;
    const m = getMonaco();
    if (!m) return false;
    if (isMonacoReady(m)) {
      LOG("Monaco detected and ready.");
      onMonacoReady(m);
      return true;
    }
    // Monaco object exists but no editor created yet — keep polling.
    return false;
  }

  // ─── Event: early_hook fires when window.monaco is first set ───────────────
  window.addEventListener(MONACO_EVENT, (e) => {
    LOG("Monaco assigned to window.monaco (early_hook event).");
    // Don't call onMonacoReady yet — Monaco object exists but editor may not.
    // tryActivate will check isMonacoReady().
    tryActivate() || startPoller(); // start poller if not ready yet
  });

  // ─── Event: early_hook fires on each monaco.editor.create() ────────────────
  // This is the strongest signal that Monaco is fully running.
  window.addEventListener(EDITOR_EVENT, (e) => {
    LOG("monaco.editor.create() intercepted — Monaco is active.");

    // LeetCode often creates its editor with hover disabled (it uses its own
    // IntelliSense overlay).  Force-enable Monaco's native hover so our
    // registered provider can actually fire.
    const editor = e.detail;
    if (editor && typeof editor.updateOptions === "function") {
      editor.updateOptions({
        hover:                      { enabled: true, delay: 300 },
        quickSuggestions:           { other: true, comments: false, strings: false },
        suggestOnTriggerCharacters: true,
        parameterHints:             { enabled: true, cycle: false }
      });
      LOG("Forced hover+suggestions+sigHelp: enabled on new editor instance.");
    }

    if (monacoInstance) {
      // A new editor was created after SPA navigation — re-register all three.
      if (enabled) {
        if (!hoverDisposable)      { LOG("Re-registering hover after editor re-creation.");           registerProvider(); }
        if (!completionDisposable) { LOG("Re-registering completion after editor re-creation.");      registerCompletionProvider(); }
        if (!signatureDisposable)  { LOG("Re-registering signature help after editor re-creation."); registerSignatureHelpProvider(); }
      }
      return;
    }
    const m = getMonaco();
    if (m) onMonacoReady(m);
  });

  // ─── Poller ────────────────────────────────────────────────────────────────
  function startPoller() {
    if (pollerTimer) return; // already running
    pollerElapsed = 0;
    pollerTimer = setInterval(() => {
      pollerElapsed += POLL_INTERVAL;
      if (tryActivate()) return; // stops itself inside onMonacoReady → stopPoller
      if (pollerElapsed >= POLL_MAX) {
        stopPoller();
        LOG("Monaco not found after 90 s. Run window.__lcji_debug() for diagnostics.");
      }
    }, POLL_INTERVAL);
  }

  function stopPoller() {
    if (pollerTimer) {
      clearInterval(pollerTimer);
      pollerTimer = null;
    }
  }

  // Start polling immediately; the events above will call stopPoller() if they
  // succeed first.
  startPoller();

  // ─── MutationObserver — SPA navigation recovery ────────────────────────────
  // When LeetCode SPA-navigates to a problem, a .monaco-editor node appears.
  // If a new editor is created (early_hook fires EDITOR_EVENT) we handle it
  // above.  This observer is a belt-and-suspenders fallback for cases where
  // the hook missed the create() call.
  const editorObserver = new MutationObserver(() => {
    if (!document.querySelector(".monaco-editor")) return;

    if (!monacoInstance) {
      startPoller();
    } else if (enabled) {
      if (!hoverDisposable)      { LOG("Editor DOM appeared; re-registering hover.");           registerProvider(); }
      if (!completionDisposable) { LOG("Editor DOM appeared; re-registering completion.");      registerCompletionProvider(); }
      if (!signatureDisposable)  { LOG("Editor DOM appeared; re-registering signature help.");  registerSignatureHelpProvider(); }
    }
  });
  editorObserver.observe(document.documentElement, { childList: true, subtree: true });

  // ─── registerProvider() ────────────────────────────────────────────────────
  function registerProvider() {
    if (!monacoInstance) { LOG("registerProvider: monacoInstance is null — skipping."); return; }

    // Dispose stale registration, if any.
    if (hoverDisposable) { hoverDisposable.dispose(); hoverDisposable = null; }

    hoverDisposable = monacoInstance.languages.registerHoverProvider(LANG_ID, {
      provideHover(model, position) {
        if (!enabled) return null;
        try {
          const wordInfo = model.getWordAtPosition(position);
          if (!wordInfo) return null;

          const token    = wordInfo.word;
          const lineText = model.getLineContent(position.lineNumber);
          const range    = {
            startLineNumber: position.lineNumber,
            startColumn:     wordInfo.startColumn,
            endLineNumber:   position.lineNumber,
            endColumn:       wordInfo.endColumn
          };

          LOG("provideHover → token:", token);
          const result = buildHover(token, lineText, range);
          if (!result) LOG("No match for token:", token);
          return result;
        } catch (err) {
          LOG("Error in provideHover:", err);
          return null;
        }
      }
    });

    LOG("Hover provider registered for '" + LANG_ID + "'. Hover over Java identifiers to test.");
  }

  // ─── Diagnostic helper ─────────────────────────────────────────────────────
  window.__lcji_debug = function () {
    const m = getMonaco();
    console.group("[LC Java IntelliSense] Diagnostic");
    console.log("enabled:",               enabled);
    console.log("monacoInstance:",        monacoInstance ? "✅ found" : "❌ not found");
    console.log("hoverDisposable:",       hoverDisposable ? "✅ registered" : "❌ not registered");
    console.log("completionDisposable:",  completionDisposable ? "✅ registered" : "❌ not registered");
    console.log("signatureDisposable:",   signatureDisposable ? "✅ registered" : "❌ not registered");
    console.log("JAVA_API:",              window.JAVA_API
      ? "✅ loaded (" + Object.keys(window.JAVA_API).length + " classes)"
      : "❌ missing");
    console.log("window.monaco:",    window.monaco ? "✅ present" : "❌ absent");
    console.log("window.require:",   typeof window.require === "function" ? "✅ present" : "❌ absent");
    console.log("Monaco ready?",     m ? (isMonacoReady(m) ? "✅ yes" : "⚠ present but no editors yet") : "❌ no");

    if (m) {
      const models  = m.editor?.getModels?.()  || [];
      const editors = m.editor?.getEditors?.() || [];
      console.log("Models:", models.length,
        models.map(md => md.getLanguageId?.()).join(", ") || "—");
      console.log("Editors:", editors.length);
      editors.forEach((e, i) => {
        console.log("  Editor", i, "language:", e.getModel?.()?.getLanguageId?.());
      });
    }

    if (!monacoInstance) {
      console.warn(
        "Hover provider not yet active. Possible causes:\n" +
        "  • LeetCode hasn't created the code editor yet (navigate to a problem).\n" +
        "  • early_hook.js failed to intercept monaco.editor.create().\n" +
        "  • The extension was reloaded after Monaco was already set (reload the page).\n" +
        "Try: window.__lcji_forceActivate() to manually trigger activation."
      );
    }
    console.groupEnd();
  };

  // Manual escape hatch: force-activate if the poller/events missed it.
  window.__lcji_forceActivate = function () {
    const m = getMonaco();
    if (!m) { console.error("[LC Java IntelliSense] Monaco not found on window.monaco."); return; }
    LOG("Force-activating...");
    monacoInstance = null;
    hoverDisposable?.dispose();      hoverDisposable = null;
    completionDisposable?.dispose(); completionDisposable = null;
    signatureDisposable?.dispose();  signatureDisposable = null;
    onMonacoReady(m);
  };

  LOG("Loaded. Run window.__lcji_debug() for diagnostics.");

  // ─── IMarkdownString factory ────────────────────────────────────────────────
  function md(value) {
    return { value, isTrusted: true };
  }

  function codeBlock(lang, code) {
    return "```" + lang + "\n" + code + "\n```";
  }

  // ─── Hover content builder ──────────────────────────────────────────────────
  function buildHover(token, lineText, range) {
    const api = window.JAVA_API;
    if (!api) {
      LOG("JAVA_API not found — data files may not have loaded.");
      return null;
    }

    // 1. Direct class / interface / enum match
    if (api[token]) {
      return { range, contents: buildClassContents(token, api[token]) };
    }

    // 2. Method / field name match across all classes
    const matches = findTokenMatches(token, api);
    if (matches.length === 0) return null;

    return { range, contents: buildMethodContents(token, matches, lineText) };
  }

  // ─── Class tooltip ──────────────────────────────────────────────────────────
  function buildClassContents(className, entry) {
    const kindIcon = entry.kind === "interface" ? "⬡" : "🔷";
    let value = "";
    value += `### ${kindIcon} \`${className}\`\n`;
    value += `*${entry.package}*\n\n`;
    value += `---\n`;
    value += `${entry.description}\n\n`;

    if (entry.constructors?.length > 0) {
      value += `**Constructors**\n\n`;
      for (const ctor of entry.constructors) {
        const sig = `${className}${ctor.signature.slice(ctor.signature.indexOf("("))}`;
        value += codeBlock("java", sig) + "\n";
        if (ctor.desc)   value += `${ctor.desc}\n\n`;
        if (ctor.throws) value += `⚠ *Throws:* ${ctor.throws}\n\n`;
      }
    }

    if (entry.fields && Object.keys(entry.fields).length > 0) {
      value += `**Fields / Constants**\n\n`;
      for (const [fieldName, field] of Object.entries(entry.fields)) {
        value += codeBlock("java", `${field.type} ${fieldName}`) + "\n";
        value += `${field.desc}\n\n`;
      }
    }

    const methodNames = Object.keys(entry.methods || {}).slice(0, 6);
    if (methodNames.length > 0) {
      value += `**Methods** *(hover a method name for details)*\n\n`;
      value += methodNames.map(m => `\`${m}()\``).join("  ·  ") + "\n";
    }

    return [md(value)];
  }

  // ─── Method / field matching ────────────────────────────────────────────────
  function findTokenMatches(token, api) {
    const results = [];
    for (const [className, entry] of Object.entries(api)) {
      if (entry.methods?.[token]) {
        results.push({ className, entry, overloads: entry.methods[token] });
      }
      if (entry.fields?.[token]) {
        results.push({ className, entry, field: entry.fields[token] });
      }
    }
    return results;
  }

  // ─── Method tooltip ─────────────────────────────────────────────────────────
  function buildMethodContents(token, matches, lineText) {
    const narrowed = narrowByContext(matches, lineText);
    const toShow   = narrowed.length > 0 ? narrowed : matches;
    let value = "";

    for (let i = 0; i < toShow.length; i++) {
      const { className, entry, overloads, field } = toShow[i];
      if (i > 0) value += `\n---\n`;

      const kindIcon = entry.kind === "interface" ? "⬡" : "🔷";

      if (field) {
        value += `**${kindIcon} \`${className}.${token}\`** — *${entry.package}*\n\n`;
        value += codeBlock("java", `${field.type} ${token}`) + "\n";
        value += `${field.desc}\n`;
        continue;
      }

      value += `**${kindIcon} \`${className}.${token}\`** — *${entry.package}*\n\n`;

      for (let oi = 0; oi < overloads.length; oi++) {
        const ov = overloads[oi];
        if (oi > 0) value += `\n`;

        const ret = ov.returns ? `${ov.returns} ` : "";
        value += codeBlock("java", `${ret}${ov.signature}`) + "\n";
        if (ov.desc) value += `${ov.desc}\n\n`;

        if (ov.params?.length > 0) {
          for (const p of ov.params) {
            value += `- \`${p.type}\` **${p.name}** — ${p.desc}\n`;
          }
          value += "\n";
        }

        if (ov.returnsDesc) value += `↩ *Returns:* ${ov.returnsDesc}\n\n`;

        if (ov.throws?.length > 0) {
          for (const t of ov.throws) {
            value += `⚠ *Throws:* \`${t}\`\n`;
          }
          value += "\n";
        }
      }
    }

    return [md(value)];
  }

  // ─── Context narrowing ──────────────────────────────────────────────────────
  function narrowByContext(matches, lineText) {
    if (matches.length <= 1) return matches;
    const preferred = matches.filter(m => lineText.includes(m.className));
    return preferred.length > 0 ? preferred : matches;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ─── Completion provider (dot-triggered) ────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * registerCompletionProvider()
   * Registers a Monaco completion provider that fires when the user types '.'
   * after a class name or variable name, returning method + field suggestions.
   */
  function registerCompletionProvider() {
    if (!monacoInstance) { LOG("registerCompletionProvider: monacoInstance is null — skipping."); return; }
    if (completionDisposable) { completionDisposable.dispose(); completionDisposable = null; }

    const CompletionItemKind = monacoInstance.languages.CompletionItemKind;
    const InsertTextRule     = monacoInstance.languages.CompletionItemInsertTextRule;

    completionDisposable = monacoInstance.languages.registerCompletionItemProvider(LANG_ID, {
      triggerCharacters: ["."],

      provideCompletionItems(model, position) {
        if (!enabled) return null;
        try {
          const lineText        = model.getLineContent(position.lineNumber);
          const textBeforeCursor = lineText.substring(0, position.column - 1);

          // We need exactly: <word>.<cursor>
          // (possibly with whitespace, but practically always adjacent)
          const dotMatch = textBeforeCursor.match(/(\w+)\s*\.\s*$/);
          if (!dotMatch) return null;

          const objectName = dotMatch[1];
          LOG("Completion triggered after:", objectName);

          const className = resolveType(objectName, model, position);
          if (!className) { LOG("Could not resolve type of:", objectName); return { suggestions: [] }; }

          const entry = window.JAVA_API?.[className];
          if (!entry)    { LOG("No JAVA_API entry for:", className);         return { suggestions: [] }; }

          LOG("Completion: resolved", objectName, "→", className);

          // Range = the partial word the user may already have typed after the dot
          const partialWord = model.getWordAtPosition(position);
          const range = partialWord
            ? { startLineNumber: position.lineNumber, endLineNumber: position.lineNumber,
                startColumn: partialWord.startColumn, endColumn: partialWord.endColumn }
            : { startLineNumber: position.lineNumber, endLineNumber: position.lineNumber,
                startColumn: position.column, endColumn: position.column };

          const suggestions = [];

          // ── Methods ──────────────────────────────────────────────────────
          for (const [methodName, overloads] of Object.entries(entry.methods || {})) {
            const ov       = overloads[0]; // primary overload for label/signature
            const hasParams = (ov.params?.length ?? 0) > 0;
            const paramStr  = (ov.params || []).map(p => p.type + " " + p.name).join(", ");
            const retStr    = ov.returns || "void";

            suggestions.push({
              label:            { label: methodName + "()", detail: " " + retStr, description: entry.package },
              kind:             CompletionItemKind.Method,
              detail:           retStr + " " + methodName + "(" + paramStr + ")",
              documentation:    buildCompletionDoc(methodName, overloads),
              insertText:       hasParams ? methodName + "($0)" : methodName + "()",
              insertTextRules:  hasParams ? InsertTextRule.InsertAsSnippet : 0,
              range,
              sortText:         "0_" + methodName,   // methods first
              filterText:       methodName
            });
          }

          // ── Fields / constants ────────────────────────────────────────────
          for (const [fieldName, field] of Object.entries(entry.fields || {})) {
            suggestions.push({
              label:         { label: fieldName, detail: " " + field.type, description: entry.package },
              kind:          CompletionItemKind.Field,
              detail:        field.type + " " + fieldName,
              documentation: { value: field.desc, isTrusted: true },
              insertText:    fieldName,
              range,
              sortText:      "1_" + fieldName,       // fields after methods
              filterText:    fieldName
            });
          }

          return { suggestions, incomplete: false };
        } catch (err) {
          LOG("Error in provideCompletionItems:", err);
          return null;
        }
      }
    });

    LOG("Completion provider registered for '" + LANG_ID + "'. Type 'ClassName.' or 'varName.' to test.");
  }

  /**
   * buildCompletionDoc(methodName, overloads)
   * Builds a Markdown documentation string for the completion item tooltip.
   * Shows all overloads so the user knows the full API.
   */
  function buildCompletionDoc(methodName, overloads) {
    let value = "";
    for (let i = 0; i < overloads.length; i++) {
      const ov  = overloads[i];
      if (i > 0) value += "\n---\n";
      const ret  = ov.returns ? ov.returns + " " : "void ";
      value += codeBlock("java", ret + ov.signature) + "\n";
      if (ov.desc) value += ov.desc + "\n\n";
      if (ov.params?.length > 0) {
        for (const p of ov.params) value += `- \`${p.type}\` **${p.name}** — ${p.desc}\n`;
        value += "\n";
      }
      if (ov.returnsDesc) value += `↩ *Returns:* ${ov.returnsDesc}\n\n`;
      if (ov.throws?.length > 0) {
        for (const t of ov.throws) value += `⚠ *Throws:* \`${t}\`\n`;
      }
    }
    return { value, isTrusted: true };
  }

  /**
   * resolveType(objectName, model, position)
   * Returns the Java class name for the given identifier, or null.
   *
   * Resolution order:
   *   1. Direct class name match      → for static access  (Math, Integer, Arrays…)
   *   2. Declaration scan (upward)    → TypeName<G>  varName
   *   3. Constructor assignment scan  → varName = new TypeName()
   *   4. For-each loop variable scan  → for (TypeName varName : collection)
   */
  function resolveType(objectName, model, position) {
    const api = window.JAVA_API;
    if (!api) return null;

    // 1. Direct class name (e.g. Math, Integer, Collections)
    if (api[objectName]) return objectName;

    const currentLine = position.lineNumber;

    for (let i = currentLine; i >= 1; i--) {
      const line = model.getLineContent(i);

      // 2. Declaration: TypeName<...>[]* varName
      //    e.g. "HashMap<Integer, String> map = ..."
      //         "ArrayList<Integer> list;"
      //         "int[] arr" — ignored (primitives not in JAVA_API)
      const declRe = new RegExp(
        `(?:^|[\\s;{(])([A-Z]\\w*)(?:<[^>]*>)?(?:\\[\\])*\\s+${rxEscape(objectName)}(?:\\s*[=;,)])`,
        "m"
      );
      const declMatch = line.match(declRe);
      if (declMatch && api[declMatch[1]]) return declMatch[1];

      // 3. Constructor assignment: varName = new TypeName(...)
      //    e.g. "map = new HashMap<>()"  or  "list = new ArrayList<>();"
      const newRe = new RegExp(`\\b${rxEscape(objectName)}\\s*=\\s*new\\s+([A-Z]\\w*)`);
      const newMatch = line.match(newRe);
      if (newMatch && api[newMatch[1]]) return newMatch[1];

      // 4. For-each loop variable: for (TypeName varName : ...)
      //    e.g. "for (String s : list)"
      const forRe = new RegExp(`for\\s*\\(\\s*([A-Z]\\w*)(?:<[^>]*>)?(?:\\[\\])*\\s+${rxEscape(objectName)}\\s*:`);
      const forMatch = line.match(forRe);
      if (forMatch && api[forMatch[1]]) return forMatch[1];
    }

    return null;
  }

  /** Escapes a string for use inside a RegExp character class or pattern. */
  function rxEscape(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ─── Signature Help Provider (( and , triggered) ─────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * registerSignatureHelpProvider()
   *
   * Shows a parameter-hints tooltip when the cursor is inside a method call's
   * parentheses, e.g.:
   *
   *   list.add(|)            →  add(int index, E element)
   *   sb.insert(3, |)        →  insert(int offset, String str)  [param 1 highlighted]
   *   Integer.parseInt(s, |) →  parseInt(String s, int radix)   [param 1 highlighted]
   */
  function registerSignatureHelpProvider() {
    if (!monacoInstance) { LOG("registerSignatureHelpProvider: monacoInstance is null — skipping."); return; }
    if (signatureDisposable) { signatureDisposable.dispose(); signatureDisposable = null; }

    signatureDisposable = monacoInstance.languages.registerSignatureHelpProvider(LANG_ID, {
      signatureHelpTriggerCharacters:   ["(", ","],
      signatureHelpRetriggerCharacters: [","],

      provideSignatureHelp(model, position /*, token, context */) {
        if (!enabled) return null;
        try {
          const sigCtx = findSignatureContext(model, position);
          if (!sigCtx) return null;

          const { methodName, objectName, activeParam } = sigCtx;
          LOG("SignatureHelp → method:", methodName, "  object:", objectName ?? "(none)",
              "  param index:", activeParam);

          const api = window.JAVA_API;
          if (!api) return null;

          // Resolve which class owns the method
          let overloads    = null;
          let resolvedClass = null;

          if (objectName) {
            const cls = resolveType(objectName, model, position);
            if (cls && api[cls]?.methods?.[methodName]) {
              overloads     = api[cls].methods[methodName];
              resolvedClass = cls;
            }
          }

          // Fall back: search all classes (handles bare method calls like parseInt)
          if (!overloads) {
            for (const [cls, entry] of Object.entries(api)) {
              if (entry.methods?.[methodName]) {
                overloads     = entry.methods[methodName];
                resolvedClass = cls;
                break;
              }
            }
          }

          if (!overloads) return null;
          LOG("SignatureHelp: resolved", methodName, "→", resolvedClass);

          // Build Monaco SignatureInformation for each overload
          const signatures = overloads.map(ov => {
            const params  = ov.params || [];
            const retPart = ov.returns ? ov.returns + " " : "";

            // Rebuild the label precisely so we can compute exact param offsets:
            // e.g.  "boolean add(E e)"  or  "void add(int index, E element)"
            const methodPart   = ov.signature.substring(0, ov.signature.indexOf("("));
            const paramStrings = params.map(p => p.type + " " + p.name);
            const innerLabel   = paramStrings.join(", ");
            const fullLabel    = retPart + methodPart + "(" + innerLabel + ")";

            // Compute character offsets for each param inside fullLabel
            const openParenPos = (retPart + methodPart + "(").length;
            const parameters   = [];
            let   cursor       = openParenPos;
            for (let pi = 0; pi < paramStrings.length; pi++) {
              const ps = paramStrings[pi];
              parameters.push({
                label: [cursor, cursor + ps.length],
                documentation: {
                  value: "`" + params[pi].type + "` **" + params[pi].name + "** — " + params[pi].desc,
                  isTrusted: true
                }
              });
              cursor += ps.length + 2; // +2 for ", "
            }

            // Build description: method desc + returns
            let docValue = ov.desc || "";
            if (ov.returnsDesc) docValue += "\n\n↩ *Returns:* " + ov.returnsDesc;
            if (ov.throws?.length > 0) {
              docValue += "\n\n";
              for (const t of ov.throws) docValue += "⚠ *Throws:* `" + t + "`\n";
            }

            return {
              label: fullLabel,
              documentation: docValue ? { value: docValue, isTrusted: true } : undefined,
              parameters
            };
          });

          // Pick the best activeSignature: prefer the overload whose param count
          // covers the current argument position.
          let activeSignature = 0;
          for (let si = 0; si < overloads.length; si++) {
            if ((overloads[si].params?.length ?? 0) >= activeParam + 1) {
              activeSignature = si;
              break;
            }
          }
          const clampedParam = Math.min(
            activeParam,
            Math.max(0, (overloads[activeSignature].params?.length ?? 1) - 1)
          );

          return {
            value: { signatures, activeSignature, activeParameter: clampedParam },
            dispose() {}
          };
        } catch (err) {
          LOG("Error in provideSignatureHelp:", err);
          return null;
        }
      }
    });

    LOG("Signature help provider registered for '" + LANG_ID + "'. Type a method call to test.");
  }

  /**
   * findSignatureContext(model, position)
   *
   * Scans backward from the cursor (across up to 10 lines) to find the innermost
   * unclosed '(' and derives:
   *   - methodName  : the identifier immediately before that '('
   *   - objectName  : the identifier before 'methodName.' (null if none)
   *   - activeParam : how many commas at depth 0 are between '(' and cursor
   *
   * Returns null if the cursor is not inside any method call.
   */
  function findSignatureContext(model, position) {
    // Collect text from up to 10 lines back to current cursor
    const MAX_LINES_BACK = 10;
    const fromLine = Math.max(1, position.lineNumber - MAX_LINES_BACK);
    const lines    = [];
    for (let i = fromLine; i <= position.lineNumber; i++) {
      const raw = model.getLineContent(i);
      lines.push(i === position.lineNumber ? raw.substring(0, position.column - 1) : raw);
    }
    const text = lines.join("\n");

    let depth       = 0;
    let activeParam = 0;
    let openIdx     = -1;

    // Walk backward; track paren depth and count commas at depth 0
    for (let i = text.length - 1; i >= 0; i--) {
      const ch = text[i];
      if      (ch === ")") { depth++; }
      else if (ch === "(") {
        if (depth === 0) { openIdx = i; break; }
        depth--;
      }
      else if (ch === "," && depth === 0) { activeParam++; }
    }

    if (openIdx < 0) return null;   // not inside any method call

    // Extract method name: word chars immediately before '('
    const beforeParen  = text.substring(0, openIdx);
    const methodMatch  = beforeParen.match(/(\w+)\s*$/);
    if (!methodMatch) return null;
    const methodName   = methodMatch[1];

    // Extract object name: word before '.' before the method name
    const beforeMethod = beforeParen.substring(0, beforeParen.length - methodMatch[0].length);
    const dotMatch     = beforeMethod.match(/(\w+)\s*\.\s*$/);
    const objectName   = dotMatch ? dotMatch[1] : null;

    return { methodName, objectName, activeParam };
  }

})();
