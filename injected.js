/**
 * injected.js — MAIN world, document_idle
 *
 * Registers a Java hover provider with Monaco.
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
  let enabled         = true;
  let monacoInstance  = null;   // set once Monaco is fully ready
  let hoverDisposable = null;
  let pollerTimer     = null;
  let pollerElapsed   = 0;

  // ─── Bridge: toggle relay from bridge.js (ISOLATED world) ──────────────────
  window.addEventListener("message", (event) => {
    if (event.source !== window || event.data?.source !== BRIDGE_SOURCE) return;
    enabled = !!event.data.enabled;
    LOG("Toggle:", enabled ? "ON" : "OFF");
    if (!monacoInstance) return;
    if (!enabled && hoverDisposable) {
      hoverDisposable.dispose();
      hoverDisposable = null;
    } else if (enabled && !hoverDisposable) {
      registerProvider();
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
        ed.updateOptions({ hover: { enabled: true, delay: 300 } });
        LOG("Forced hover: enabled on existing editor (lang: " + ed.getModel?.()?.getLanguageId?.() + ")");
      }
    }

    if (enabled) registerProvider();
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
      editor.updateOptions({ hover: { enabled: true, delay: 300 } });
      LOG("Forced hover: enabled on new editor instance.");
    }

    if (monacoInstance) {
      // A new editor was created after SPA navigation — re-register.
      if (enabled && !hoverDisposable) {
        LOG("Re-registering provider after editor re-creation.");
        registerProvider();
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
    } else if (enabled && !hoverDisposable) {
      LOG("Editor DOM appeared; re-registering provider.");
      registerProvider();
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
    console.log("enabled:",          enabled);
    console.log("monacoInstance:",   monacoInstance ? "✅ found" : "❌ not found");
    console.log("hoverDisposable:",  hoverDisposable ? "✅ registered" : "❌ not registered");
    console.log("JAVA_API:",         window.JAVA_API
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
    monacoInstance = null; // reset so onMonacoReady runs again
    hoverDisposable?.dispose();
    hoverDisposable = null;
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

})();
