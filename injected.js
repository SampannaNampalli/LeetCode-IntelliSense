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

  // ── Cross-reload cleanup ───────────────────────────────────────────────────
  // Monaco providers are page-level globals. If the extension reloads without
  // a tab refresh, the IIFE re-runs but the OLD providers are still registered
  // in Monaco. Call any cleanup left by the previous run before doing anything.
  if (typeof window.__lcji_cleanup === "function") {
    try { window.__lcji_cleanup(); } catch (_) {}
  }
  window.__lcji_cleanup = null; // will be set again after registration

  // ─── Constants ─────────────────────────────────────────────────────────────
  const BRIDGE_SOURCE   = "lc-intellisense-bridge";
  const MONACO_EVENT    = "__lc_intellisense_monaco_ready__";
  const EDITOR_EVENT    = "__lc_intellisense_editor_created__";
  // Only register for the exact Monaco language IDs LeetCode actually uses
  // (confirmed via window.__lcji_debug()). Registering for extra IDs such as
  // "c++" or "python" causes Monaco to treat them as wildcards, firing those
  // providers for every model and producing duplicate hover/completion results.
  const SUPPORTED_LANGS = ["java", "cpp", "python3"];
  const POLL_INTERVAL   = 200;   // ms
  const POLL_MAX        = 90_000; // ms
  const LOG = (...a) => console.log("[LC IntelliSense]", ...a);

  /** Returns the API object for the given Monaco language ID, or null. */
  function getApiForLang(langId) {
    if (!langId) return null;
    if (langId === "java") return window.JAVA_API || null;
    // Accept any C++-ish language ID: "cpp", "c++", "c_cpp", "cplusplus", etc.
    if (langId === "cpp" || langId.includes("c++") || langId.includes("cpp"))
      return window.CPP_API || null;
    // Accept "python" and "python3" (LeetCode may use either).
    if (langId === "python" || langId.includes("python"))
      return window.PYTHON_API || null;
    return null;
  }

  /** Returns true if langId is any Python variant. */
  function isPythonLang(langId) {
    return langId === "python" || langId === "python3" || (langId && langId.includes("python"));
  }

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
    LOG("Monaco confirmed ready. Registering providers for:", SUPPORTED_LANGS.join(", "), "...");

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
    if (hoverDisposable) { hoverDisposable.dispose(); hoverDisposable = null; }

    // Register one HoverProvider per supported language and wrap them so the
    // rest of the code can call hoverDisposable.dispose() as before.
    const disposables = SUPPORTED_LANGS.map(langId =>
      monacoInstance.languages.registerHoverProvider(langId, {
        provideHover(model, position) {
          if (!enabled) return null;
          try {
            const modelLang = model.getLanguageId?.() || "";
            // Guard: only handle the language this provider was registered for.
            // This prevents the Java provider from showing results on a C++ model
            // when Monaco calls multiple providers.
            const api = getApiForLang(modelLang);
            if (!api) return null;
            // Guard: each provider only fires for its own language family.
            const modelIsJava   = modelLang === "java";
            const modelIsCpp    = modelLang === "cpp" || modelLang === "c++";
            const modelIsPython = isPythonLang(modelLang);
            const providerIsJava   = langId === "java";
            const providerIsCpp    = langId === "cpp" || langId === "c++";
            const providerIsPython = isPythonLang(langId);
            if (providerIsJava   && !modelIsJava)   return null;
            if (providerIsCpp    && !modelIsCpp)    return null;
            if (providerIsPython && !modelIsPython) return null;
            if (!providerIsJava && !providerIsCpp && !providerIsPython) return null;
            const wordInfo = model.getWordAtPosition(position);
            if (!wordInfo) return null;
            const token    = wordInfo.word;
            const lineText = model.getLineContent(position.lineNumber);
            const range    = {
              startLineNumber: position.lineNumber, startColumn: wordInfo.startColumn,
              endLineNumber:   position.lineNumber, endColumn:   wordInfo.endColumn
            };
            LOG("provideHover [" + langId + "/" + modelLang + "] → token:", token);
            const result = buildHover(token, lineText, range, api);
            if (!result) LOG("No match for token:", token);
            return result;
          } catch (err) { LOG("Error in provideHover:", err); return null; }
        }
      })
    );
    hoverDisposable = { dispose() { disposables.forEach(d => d.dispose()); } };
    LOG("Hover providers registered for:", SUPPORTED_LANGS.join(", "));
    exposeCleanup();
  }

  /** Keeps window.__lcji_cleanup up-to-date so the next extension reload can
   *  dispose our providers before registering its own. */
  function exposeCleanup() {
    window.__lcji_cleanup = function () {
      try { hoverDisposable?.dispose();      } catch (_) {}
      try { completionDisposable?.dispose(); } catch (_) {}
      try { signatureDisposable?.dispose();  } catch (_) {}
      hoverDisposable = null;
      completionDisposable = null;
      signatureDisposable = null;
      monacoInstance = null;
    };
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
    console.log("JAVA_API:",   window.JAVA_API   ? "✅ loaded (" + Object.keys(window.JAVA_API).length   + " classes)" : "❌ missing");
    console.log("CPP_API:",    window.CPP_API    ? "✅ loaded (" + Object.keys(window.CPP_API).length    + " classes)" : "❌ missing");
    console.log("PYTHON_API:", window.PYTHON_API ? "✅ loaded (" + Object.keys(window.PYTHON_API).length + " classes)" : "❌ missing");
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
        "Providers not yet active. Possible causes:\n" +
        "  • LeetCode hasn't created the code editor yet (navigate to a problem).\n" +
        "  • early_hook.js failed to intercept monaco.editor.create().\n" +
        "  • The extension was reloaded after Monaco was already set (reload the page).\n" +
        "Try: window.__lcji_forceActivate() to manually trigger activation."
      );
    }
    console.groupEnd();
  };

  // C++-specific diagnostic — run this while on a C++ LeetCode problem
  window.__lcji_cppDebug = function () {
    const m = getMonaco();
    console.group("[LC IntelliSense] C++ Diagnostic");
    console.log("CPP_STL_DATA_A:", window.CPP_STL_DATA_A ? "✅ (" + Object.keys(window.CPP_STL_DATA_A).length + " types)" : "❌ missing");
    console.log("CPP_STL_DATA_B:", window.CPP_STL_DATA_B ? "✅ (" + Object.keys(window.CPP_STL_DATA_B).length + " types)" : "❌ missing");
    console.log("CPP_ALGO_DATA:",  window.CPP_ALGO_DATA  ? "✅ (" + Object.keys(window.CPP_ALGO_DATA).length  + " types)" : "❌ missing");
    console.log("CPP_API:",        window.CPP_API        ? "✅ (" + Object.keys(window.CPP_API).length        + " total)"  : "❌ missing");
    if (window.CPP_API) console.log("CPP_API keys:", Object.keys(window.CPP_API).join(", "));
    if (m) {
      const editors = m.editor?.getEditors?.() || [];
      editors.forEach((ed, i) => {
        const lang = ed.getModel?.()?.getLanguageId?.();
        const api  = getApiForLang(lang || "");
        console.log("Editor", i, "langId:", lang, "→ api:", api ? "✅ found (" + Object.keys(api).length + " classes)" : "❌ no match");
      });
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
  // api is passed in from provideHover (JAVA_API or CPP_API).
  // langHint is used for syntax-highlighted code blocks.
  function buildHover(token, lineText, range, api) {
    if (!api) { LOG("API not loaded."); return null; }

    // Determine syntax highlight language for code blocks.
    const langHint = api === window.JAVA_API ? "java"
                   : api === window.PYTHON_API ? "python"
                   : "cpp";

    // 1. Direct class / interface / enum match
    if (api[token]) {
      return { range, contents: buildClassContents(token, api[token], langHint) };
    }

    // 2. Method / field name match across all classes
    const matches = findTokenMatches(token, api);
    if (matches.length === 0) return null;

    return { range, contents: buildMethodContents(token, matches, lineText, langHint) };
  }

  // ─── Class tooltip ──────────────────────────────────────────────────────────
  function buildClassContents(className, entry, langHint) {
    langHint = langHint || "java";
    const kindIcon = entry.kind === "interface" ? "⧁" : "🔷";
    let value = "";
    value += `### ${kindIcon} \`${className}\`\n`;
    value += `*${entry.package}*\n\n`;
    value += `---\n`;
    value += `${entry.description}\n\n`;

    if (entry.constructors?.length > 0) {
      value += `**Constructors**\n\n`;
      for (const ctor of entry.constructors) {
        const sig = `${className}${ctor.signature.slice(ctor.signature.indexOf("("))}`;
        value += codeBlock(langHint, sig) + "\n";
        if (ctor.desc)   value += `${ctor.desc}\n\n`;
        if (ctor.throws) value += `⚠ *Throws:* ${ctor.throws}\n\n`;
      }
    }

    if (entry.fields && Object.keys(entry.fields).length > 0) {
      value += `**Fields / Constants**\n\n`;
      for (const [fieldName, field] of Object.entries(entry.fields)) {
        value += codeBlock(langHint, `${field.type} ${fieldName}`) + "\n";
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

    const disposables = SUPPORTED_LANGS.map(langId =>
      monacoInstance.languages.registerCompletionItemProvider(langId, {
        triggerCharacters: ["."],
        provideCompletionItems(model, position) {
          if (!enabled) return null;
          try {
            const modelLang = model.getLanguageId?.() || "";
            // Guard: each provider only handles its own language family.
            const modelIsJava   = modelLang === "java";
            const modelIsCpp    = modelLang === "cpp" || modelLang === "c++";
            const modelIsPython = isPythonLang(modelLang);
            const providerIsJava   = langId === "java";
            const providerIsCpp    = langId === "cpp" || langId === "c++";
            const providerIsPython = isPythonLang(langId);
            if (providerIsJava   && !modelIsJava)   return null;
            if (providerIsCpp    && !modelIsCpp)    return null;
            if (providerIsPython && !modelIsPython) return null;
            if (!providerIsJava && !providerIsCpp && !providerIsPython) return null;
            const api = getApiForLang(modelLang);
            if (!api) return null;
            const lineText         = model.getLineContent(position.lineNumber);
            const textBeforeCursor = lineText.substring(0, position.column - 1);
            const dotMatch = textBeforeCursor.match(/(\w+)\s*\.\s*$/);
            if (!dotMatch) return null;
            const objectName = dotMatch[1];
            LOG("Completion [" + langId + "] after:", objectName);
            const className = resolveTypeForLang(objectName, model, position, langId, api);
            if (!className) { LOG("Could not resolve type of:", objectName); return { suggestions: [] }; }
            const entry = api[className];
            if (!entry)    { return { suggestions: [] }; }
            LOG("Completion: resolved", objectName, "→", className);
            const partialWord = model.getWordAtPosition(position);
            const range = partialWord
              ? { startLineNumber: position.lineNumber, endLineNumber: position.lineNumber,
                  startColumn: partialWord.startColumn, endColumn: partialWord.endColumn }
              : { startLineNumber: position.lineNumber, endLineNumber: position.lineNumber,
                  startColumn: position.column, endColumn: position.column };
            const suggestions = [];
            for (const [methodName, overloads] of Object.entries(entry.methods || {})) {
              const ov = overloads[0];
              const hasParams = (ov.params?.length ?? 0) > 0;
              const paramStr  = (ov.params || []).map(p => p.type + " " + p.name).join(", ");
              const retStr    = ov.returns || "void";
              suggestions.push({
                label: { label: methodName + "()", detail: " " + retStr, description: entry.package },
                kind: CompletionItemKind.Method,
                detail: retStr + " " + methodName + "(" + paramStr + ")",
                documentation: buildCompletionDoc(methodName, overloads),
                insertText: hasParams ? methodName + "($0)" : methodName + "()",
                insertTextRules: hasParams ? InsertTextRule.InsertAsSnippet : 0,
                range, sortText: "0_" + methodName, filterText: methodName
              });
            }
            for (const [fieldName, field] of Object.entries(entry.fields || {})) {
              suggestions.push({
                label: { label: fieldName, detail: " " + field.type, description: entry.package },
                kind: CompletionItemKind.Field,
                detail: field.type + " " + fieldName,
                documentation: { value: field.desc, isTrusted: true },
                insertText: fieldName, range,
                sortText: "1_" + fieldName, filterText: fieldName
              });
            }
            return { suggestions, incomplete: false };
          } catch (err) { LOG("Error in provideCompletionItems:", err); return null; }
        }
      })
    );
    completionDisposable = { dispose() { disposables.forEach(d => d.dispose()); } };
    LOG("Completion providers registered for:", SUPPORTED_LANGS.join(", "));
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

  /** Escapes a string for use inside a RegExp pattern. */
  function rxEscape(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  /**
   * resolveTypeForLang — dispatches to the right resolver based on language.
   */
  function resolveTypeForLang(objectName, model, position, langId, api) {
    if (langId === "cpp" || langId === "c++") return resolveTypeCpp(objectName, model, position, api);
    if (isPythonLang(langId))                 return resolveTypePython(objectName, model, position, api);
    return resolveType(objectName, model, position);
  }

  /**
   * resolveTypePython — infers the Python type of objectName by scanning upward.
   *
   * Resolution order:
   *   1. Direct API key match  (list, dict, deque, Counter, math, heapq…)
   *   2. Literal initializer   (x = [] → list, x = {} → dict, x = set() → set)
   *   3. Type annotation       (x: list or x: list[int])
   *   4. Constructor call      (x = deque(), x = Counter(nums), x = defaultdict(int))
   */
  function resolveTypePython(objectName, model, position, api) {
    if (!api) api = window.PYTHON_API;
    if (!api) return null;

    // 1. Direct API key (e.g. the user typed "list." or "math.")
    if (api[objectName]) return objectName;

    const currentLine = position.lineNumber;
    for (let i = currentLine; i >= 1; i--) {
      const line = model.getLineContent(i);

      // 2. Type annotation: varName: TypeName or varName: TypeName[...]
      const annotRe = new RegExp(`\\b${rxEscape(objectName)}\\s*:\\s*(\\w+)`);
      const annotMatch = line.match(annotRe);
      if (annotMatch && api[annotMatch[1]]) return annotMatch[1];

      // 3. Literal initializer
      //    x = []  → list
      //    x = {}  → dict (Note: {} could be dict or set — prefer dict as it's more common)
      //    x = ()  → tuple
      const litRe = new RegExp(`\\b${rxEscape(objectName)}\\s*=\\s*([\\[\\{\\(])`);
      const litMatch = line.match(litRe);
      if (litMatch) {
        const brace = litMatch[1];
        if (brace === "[" && api["list"])  return "list";
        if (brace === "{" && api["dict"])  return "dict";
        if (brace === "(" && api["tuple"]) return "tuple";
      }

      // 4. Constructor call: x = TypeName(...) or x = TypeName[...](...)
      const ctorRe = new RegExp(`\\b${rxEscape(objectName)}\\s*=\\s*(\\w+)\\s*[\\[(]`);
      const ctorMatch = line.match(ctorRe);
      if (ctorMatch && api[ctorMatch[1]]) return ctorMatch[1];
    }

    return null;
  }

  /**
   * resolveTypeCpp — same strategy as resolveType() but handles C++ type names.
   * C++ types are lowercase (vector, string, map) and may have
   * const, pointer (*), and reference (&) qualifiers.
   */
  function resolveTypeCpp(objectName, model, position, api) {
    if (!api) api = window.CPP_API;
    if (!api) return null;

    // 1. Direct class name match (e.g. vector, string, algorithm)
    if (api[objectName]) return objectName;

    const currentLine = position.lineNumber;
    for (let i = currentLine; i >= 1; i--) {
      const line = model.getLineContent(i);

      // 2. Declaration: [const] TypeName[<...>][*/&] varName
      //    e.g. "vector<int> v", "string s", "const unordered_map<int,int>& mp"
      const declRe = new RegExp(
        `(?:^|[\\s;{(])(?:const\\s+)?(\\w+)(?:<[^>]*>)?(?:\\s*[*&])?\\s+${rxEscape(objectName)}(?:\\s*[=;,)]|$)`,
        "m"
      );
      const declMatch = line.match(declRe);
      if (declMatch && api[declMatch[1]]) return declMatch[1];

      // 3. Constructor: varName = TypeName(...) or varName(TypeName(...))
      //    e.g. "v = vector<int>(n, 0)"
      const ctorRe = new RegExp(`\\b${rxEscape(objectName)}\\s*=\\s*(\\w+)\\s*[<(]`);
      const ctorMatch = line.match(ctorRe);
      if (ctorMatch && api[ctorMatch[1]]) return ctorMatch[1];

      // 4. Range-for: for (auto& x : collection) — type = auto, unresolvable;
      //    but explicit type: for (string s : vec)
      const forRe = new RegExp(`for\\s*\\(\\s*(?:const\\s+)?(\\w+)(?:<[^>]*>)?(?:\\s*[*&])?\\s+${rxEscape(objectName)}\\s*:`);
      const forMatch = line.match(forRe);
      if (forMatch && api[forMatch[1]]) return forMatch[1];
    }

    return null;
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

    const disposables = SUPPORTED_LANGS.map(langId =>
      monacoInstance.languages.registerSignatureHelpProvider(langId, {
        signatureHelpTriggerCharacters:   ["(", ","],
        signatureHelpRetriggerCharacters: [","],

        provideSignatureHelp(model, position) {
          if (!enabled) return null;
          try {
            const api = getApiForLang(model.getLanguageId?.() || "");
            if (!api) return null;
            const sigCtx = findSignatureContext(model, position);
            if (!sigCtx) return null;
            const { methodName, objectName, activeParam } = sigCtx;
            LOG("SignatureHelp ["+langId+"] → method:", methodName, " object:", objectName ?? "(none)", " param:", activeParam);

            let overloads = null, resolvedClass = null;
            if (objectName) {
              const cls = resolveTypeForLang(objectName, model, position, langId, api);
              if (cls && api[cls]?.methods?.[methodName]) {
                overloads = api[cls].methods[methodName]; resolvedClass = cls;
              }
            }
            if (!overloads) {
              for (const [cls, entry] of Object.entries(api)) {
                if (entry.methods?.[methodName]) { overloads = entry.methods[methodName]; resolvedClass = cls; break; }
              }
            }
            if (!overloads) return null;
            LOG("SignatureHelp: resolved", methodName, "→", resolvedClass);

            const signatures = overloads.map(ov => {
              const params  = ov.params || [];
              const retPart = ov.returns ? ov.returns + " " : "";
              const methodPart   = ov.signature.substring(0, ov.signature.indexOf("("));
              const paramStrings = params.map(p => p.type + " " + p.name);
              const fullLabel    = retPart + methodPart + "(" + paramStrings.join(", ") + ")";
              const openParenPos = (retPart + methodPart + "(").length;
              const parameters = []; let cur = openParenPos;
              for (let pi = 0; pi < paramStrings.length; pi++) {
                const ps = paramStrings[pi];
                parameters.push({ label: [cur, cur + ps.length], documentation: { value: "`"+params[pi].type+"` **"+params[pi].name+"** — "+params[pi].desc, isTrusted: true } });
                cur += ps.length + 2;
              }
              let docValue = ov.desc || "";
              if (ov.returnsDesc) docValue += "\n\n↩ *Returns:* " + ov.returnsDesc;
              if (ov.throws?.length > 0) { docValue += "\n\n"; for (const t of ov.throws) docValue += "⚠ *Throws:* `"+t+"`\n"; }
              return { label: fullLabel, documentation: docValue ? { value: docValue, isTrusted: true } : undefined, parameters };
            });

            let activeSignature = 0;
            for (let si = 0; si < overloads.length; si++) {
              if ((overloads[si].params?.length ?? 0) >= activeParam + 1) { activeSignature = si; break; }
            }
            const clampedParam = Math.min(activeParam, Math.max(0, (overloads[activeSignature].params?.length ?? 1) - 1));
            return { value: { signatures, activeSignature, activeParameter: clampedParam }, dispose() {} };
          } catch (err) { LOG("Error in provideSignatureHelp:", err); return null; }
        }
      })
    );
    signatureDisposable = { dispose() { disposables.forEach(d => d.dispose()); } };
    LOG("Signature help providers registered for:", SUPPORTED_LANGS.join(", "));
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
