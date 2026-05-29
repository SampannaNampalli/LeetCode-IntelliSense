/**
 * early_hook.js — MAIN world, document_start
 *
 * Runs at the very start of page load, before any page scripts.
 *
 * Strategy (layered):
 *  1. If window.monaco is already present and fully initialized, fire immediately.
 *  2. Intercept the moment window.monaco is first assigned (Object.defineProperty).
 *  3. Once window.monaco is set, also hook monaco.editor.create / createModel
 *     so we know the exact instant the real editor becomes active.
 *     This is necessary because LeetCode assigns window.monaco early but only
 *     fully initialises the editor later during its React render cycle.
 */
(function () {
  "use strict";

  const EVENT_NAME        = "__lc_intellisense_monaco_ready__";
  const EDITOR_EVENT_NAME = "__lc_intellisense_editor_created__";

  function hookEditorCreate(monaco) {
    // Hook monaco.editor.create so we can:
    //   (a) Patch the creation options to force hover on before Monaco builds
    //       the editor — this is synchronous and LeetCode cannot override it.
    //   (b) Wrap the returned editor's updateOptions to prevent LeetCode from
    //       disabling hover after construction (it calls updateOptions with its
    //       own config immediately after create()).
    //   (c) Fire EDITOR_EVENT_NAME so injected.js knows the editor is live.
    const origCreate = monaco.editor?.create;
    if (!origCreate || origCreate.__lc_hooked__) return;

    monaco.editor.create = function (domElement, options, ...rest) {
      // Force hover AND suggestions into the options BEFORE the editor is
      // constructed.  LeetCode disables both to use its own custom IntelliSense
      // overlay — we override that so our registered providers can fire.
      const patchedOptions = Object.assign({}, options, {
        hover: { enabled: true, delay: 300 },
        quickSuggestions:          { other: true, comments: false, strings: false },
        suggestOnTriggerCharacters: true,
        parameterHints:            { enabled: true, cycle: false },
        suggest: {
          showMethods:         true,
          showFields:          true,
          showClasses:         false, // we don't provide class-level completions here
          showKeywords:        false,
          showSnippets:        false,
          filterGraceful:      true,
          localityBonus:       true,
          shareSuggestSelections: false
        }
      });

      const editor = origCreate.call(this, domElement, patchedOptions, ...rest);

      // Wrap the live editor's updateOptions so LeetCode can't turn hover or
      // suggestions off after the fact.
      if (editor && typeof editor.updateOptions === "function") {
        const origUpdate = editor.updateOptions.bind(editor);
        editor.updateOptions = function (newOpts) {
          if (!newOpts) return origUpdate(newOpts);

          let patched = newOpts;

          // Prevent hover being disabled
          if (patched.hover === false ||
              (typeof patched.hover === "object" && patched.hover?.enabled === false)) {
            patched = Object.assign({}, patched, { hover: { enabled: true, delay: 300 } });
          }

          // Prevent suggestions being disabled
          if (patched.quickSuggestions === false ||
              patched.suggestOnTriggerCharacters === false) {
            patched = Object.assign({}, patched, {
              quickSuggestions:           { other: true, comments: false, strings: false },
              suggestOnTriggerCharacters: true
            });
          }

          // Prevent parameter hints being disabled
          if (patched.parameterHints === false ||
              (typeof patched.parameterHints === "object" && patched.parameterHints?.enabled === false)) {
            patched = Object.assign({}, patched, { parameterHints: { enabled: true, cycle: false } });
          }

          return origUpdate(patched);
        };
      }

      window.dispatchEvent(new CustomEvent(EDITOR_EVENT_NAME, { detail: editor }));
      return editor;
    };
    monaco.editor.create.__lc_hooked__ = true;

    // Also hook createModel as some LeetCode versions use that path.
    const origCreateModel = monaco.editor?.createModel;
    if (origCreateModel && !origCreateModel.__lc_hooked__) {
      monaco.editor.createModel = function (...args) {
        const model = origCreateModel.apply(this, args);
        window.dispatchEvent(new CustomEvent(EDITOR_EVENT_NAME, { detail: null }));
        return model;
      };
      monaco.editor.createModel.__lc_hooked__ = true;
    }
  }

  function onMonacoSet(val) {
    if (!val) return;
    if (typeof val.languages?.registerHoverProvider === "function") {
      hookEditorCreate(val);
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: val }));
    }
  }

  // Guard: already present at document_start (rare, but handle it)
  if (window.monaco && typeof window.monaco.languages?.registerHoverProvider === "function") {
    onMonacoSet(window.monaco);
    return;
  }

  // Intercept the moment window.monaco is assigned by the page.
  let _monaco = undefined;
  try {
    Object.defineProperty(window, "monaco", {
      configurable: true,
      enumerable:   true,
      get() { return _monaco; },
      set(val) {
        _monaco = val;
        onMonacoSet(val);
      }
    });
  } catch (e) {
    // Property already non-configurable — fall back to poller in injected.js.
    console.warn("[LC Java IntelliSense] early_hook: could not intercept window.monaco:", e.message);
  }
})();
