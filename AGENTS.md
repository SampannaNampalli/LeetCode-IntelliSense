# AGENTS.md — LeetCode IntelliSense Extension

Persistent context for AI agents working on this codebase.
**Read this file before making any changes.**

---

## Project Overview

A **Firefox (Manifest V3) browser extension** that adds IntelliSense to
LeetCode's Monaco-based code editor. Currently supports **Java, C++, and Python 3**.

**Three working features (all languages):**
1. **Hover tooltips** — hover a class/method/field name to see full docs.
2. **Dot-triggered completion** — type `map.` to get method/field suggestions.
3. **Signature help** — cursor inside method parens shows parameter hints.

---

## File Map

```
LCAuto/
├── manifest.json          # Extension manifest (MV3, Firefox-only)
├── early_hook.js          # MAIN world, document_start — intercepts window.monaco
├── bridge.js              # ISOLATED world — relays storage toggle to injected.js
├── injected.js            # MAIN world, document_idle — registers all 3 providers
├── java-data/
│   ├── java_lang.js       # window.JAVA_LANG_DATA (String, Integer, Math, …)
│   ├── java_util.js       # window.JAVA_UTIL_DATA (ArrayList, HashMap, …)
│   ├── java_io.js         # window.JAVA_IO_DATA   (BufferedReader, …)
│   └── index.js           # Merges all three → window.JAVA_API
├── cpp-data/
│   ├── cpp_stl_a.js       # window.CPP_STL_DATA_A (vector, string, deque, pair)
│   ├── cpp_stl_b.js       # window.CPP_STL_DATA_B (map, set, stack, queue, …)
│   ├── cpp_algorithms.js  # window.CPP_ALGO_DATA  (sort, min, max, bisect, …)
│   └── index.js           # Merges → window.CPP_API
├── python-data/
│   ├── py_builtins.js     # window.PY_BUILTINS_DATA (list, dict, set, str, tuple, int)
│   ├── py_stdlib.js       # window.PY_STDLIB_DATA  (deque, Counter, heapq, math, bisect, …)
│   └── index.js           # Merges → window.PYTHON_API
└── popup/
    ├── popup.html
    ├── popup.css
    └── popup.js
```

---

## Architecture & Execution Flow

### World separation

| Script | World | When | Purpose |
|---|---|---|---|
| `early_hook.js` | MAIN | `document_start` | Intercepts `window.monaco` and `monaco.editor.create()` |
| `bridge.js` | ISOLATED | `document_idle` | Reads `browser.storage.sync`; relays via `window.postMessage` |
| `java-data/*.js` + `injected.js` | MAIN | `document_idle` | Registers providers; holds all data |

> **ISOLATED world scripts cannot access `window.monaco`.**

### Monaco Option Forcing (CRITICAL)

LeetCode **explicitly disables** Monaco's native hover widget, suggestion
widget, and parameter hints widget to use its own overlays. The extension
overrides this in `early_hook.js` at **two interception points**:

**1. Constructor options patch** — before `origCreate()` is called:
```js
const patchedOptions = Object.assign({}, options, {
  hover:                      { enabled: true, delay: 300 },
  quickSuggestions:           { other: true, comments: false, strings: false },
  suggestOnTriggerCharacters: true,
  parameterHints:             { enabled: true, cycle: false },
  suggest:                    { showMethods: true, showFields: true, … }
});
```

**2. `updateOptions` wrapper** — on the live editor instance, prevents LeetCode
from resetting these settings after `create()` returns. Guards: `hover`,
`quickSuggestions`, `suggestOnTriggerCharacters`, `parameterHints`.

### Monaco Detection Strategy (layered)

1. `__lc_intellisense_monaco_ready__` event — fired when `window.monaco` first set.
2. `__lc_intellisense_editor_created__` event — fired on each `monaco.editor.create()`.
3. Polling — `setInterval` every 200 ms, max 90 s.
4. MutationObserver on `.monaco-editor` DOM nodes — SPA navigation recovery.

### Providers in `injected.js`

Three disposables, all registered in `onMonacoReady()`:
```
hoverDisposable      → registerProvider()               → registerHoverProvider()
completionDisposable → registerCompletionProvider()     → registerCompletionItemProvider()
signatureDisposable  → registerSignatureHelpProvider()  → registerSignatureHelpProvider()
```

All three are disposed and re-registered together on toggle, SPA nav, and forceActivate.

### Key helper functions

| Function | Purpose |
|---|---|
| `getMonaco()` | Resolves Monaco from `window.monaco` or AMD require cache |
| `isMonacoReady(m)` | True only when models/editors exist |
| `onMonacoReady(m)` | Idempotent; sets `monacoInstance`, registers all 3 providers |
| `tryActivate()` | `getMonaco()` + `isMonacoReady()` → `onMonacoReady()` |
| `registerProvider()` | Registers HoverProvider for `LANG_ID` ("java") |
| `registerCompletionProvider()` | Dot-triggered; uses `resolveType()` for type inference |
| `registerSignatureHelpProvider()` | `(` and `,` triggered; uses `findSignatureContext()` |
| `buildHover()` | Dispatches to class or method tooltip builder |
| `resolveType()` | Scans upward for Java variable declarations |
| `findSignatureContext()` | Backward paren scan to find enclosing method call |
| `narrowByContext()` | Prefers class mentioned on same line for ambiguous methods |

### Enable/disable toggle

- `popup.js` writes `{ enabled: bool }` to `browser.storage.sync`.
- `bridge.js` relays via `postMessage { source: "lc-intellisense-bridge", enabled }`.
- `injected.js` disposes or re-registers all 3 providers.

---

## Data Schema (`window.JAVA_API` / `window.CPP_API`)

Same schema for both languages:

```ts
interface API { [className: string]: ClassEntry; }

interface ClassEntry {
  package: string;        // e.g. "java.util" or "std (<vector>)"
  kind: "class" | "interface" | "enum";
  description: string;
  constructors: ConstructorEntry[];
  fields?:  { [name: string]: FieldEntry };
  methods?: { [name: string]: OverloadEntry[] };
}

interface OverloadEntry {
  signature: string;      // e.g. "push_back(const T& val)"
  returns?: string;
  returnsDesc?: string;
  params?: { name: string; type: string; desc: string; }[];
  desc?: string;
  throws?: string[];
}
```

For C++ free functions (sort, min, max…), store under pseudo-class keys
like `"algorithm"` and `"cstdlib"`. The signature-help fallback search
finds them automatically.

---

## C++ Implementation Plan (PENDING)

### Files to create
1. `cpp-data/cpp_stl.js` → `window.CPP_STL_DATA`
   - Containers: `vector`, `string`, `unordered_map`, `map`, `unordered_set`,
     `set`, `stack`, `queue`, `deque`, `priority_queue`, `pair`
2. `cpp-data/cpp_algorithms.js` → `window.CPP_ALGO_DATA`
   - `"algorithm"` key: `sort`, `reverse`, `find`, `count`, `min`, `max`,
     `min_element`, `max_element`, `lower_bound`, `upper_bound`,
     `binary_search`, `accumulate`, `fill`, `swap`, `next_permutation`,
     `unique`, `rotate`, `nth_element`
   - `"cstdlib"` key: `to_string`, `stoi`, `stol`, `stoll`, `abs`, `sqrt`,
     `pow`, `log`
3. `cpp-data/index.js` → `window.CPP_API = Object.assign({}, window.CPP_STL_DATA, window.CPP_ALGO_DATA)`

### manifest.json changes
Add to MAIN world content_scripts before `injected.js`:
```json
"cpp-data/cpp_stl.js",
"cpp-data/cpp_algorithms.js",
"cpp-data/index.js"
```

### injected.js changes
- Add `const SUPPORTED_LANGS = ["java", "cpp"]`
- Disposables become objects: `hoverDisposables = {}`, etc.
- `registerProvider()` loops over `SUPPORTED_LANGS`, registers per language
- All provider callbacks check `model.getLanguageId()` → pick `CPP_API` or `JAVA_API`
- Add `resolveTypeCpp(objectName, model, position)` — same logic as `resolveType()`
  but regex allows lowercase type names + handles `const T`, `T*`, `T&` qualifiers
- `__lcji_debug()` shows status per language

### C++ type resolution regex differences from Java
Java: `[A-Z]\w*` (uppercase start)
C++: `\w+` (any case) + strip qualifiers: `const`, `*`, `&`, `&&`

---

## Common Pitfalls & Known Issues

### 1. `window.require: ❌ absent`
Not an error. LeetCode's AMD loader is scoped. Informational only.

### 2. Providers registered but nothing appears
LeetCode disables hover/suggestions/parameterHints. Fixed in `early_hook.js`
by patching `monaco.editor.create()` options and wrapping `updateOptions`.

### 3. Extension loaded after Monaco was already set
The 200 ms poller catches it. Manual fix: `window.__lcji_forceActivate()`.

### 4. SPA navigation disposes the editor
Handled by `EDITOR_EVENT` listener and `MutationObserver`.

---

## How to Test

1. `about:debugging` → **This Firefox** → **Load Temporary Add-on** → `manifest.json`
2. Navigate to a LeetCode problem → select Java or C++
3. Run `window.__lcji_debug()` — all entries should show ✅
4. Hover over class names, type `.` after variables, type `(` after method names

```js
window.__lcji_debug()          // Full diagnostic report
window.__lcji_forceActivate()  // Force re-activation
```

---

## Extension Permissions

Only `"storage"` — for the enable/disable toggle.
Match pattern: `"https://leetcode.com/*"`.
Firefox-only (`browser.*` API; `browser_specific_settings.gecko` in manifest).
