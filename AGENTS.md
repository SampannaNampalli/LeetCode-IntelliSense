# AGENTS.md — LeetCode IntelliSense Extension

Persistent context for AI agents working on this codebase.
**Read this file before making any changes.**

---

## Project Overview

A **Manifest V3 browser extension** that adds IntelliSense to LeetCode's
Monaco-based code editor. Supports **Firefox 128+** and **Chrome 111+**
(including Brave and all Chromium-based browsers).
Currently provides IntelliSense for **Java, C++, and Python 3**.

**Cross-browser compatibility:**
- `browser.*` API (Firefox) vs `chrome.*` (Chrome) — handled by a one-line shim
  in `bridge.js` and `popup/popup.js`:
  `const _ext = (typeof browser !== "undefined") ? browser : chrome;`
- `world: "MAIN"` content scripts — supported in Chrome 111+ and Firefox 128+.
- `browser_specific_settings` removed from manifest (was Firefox-only).

**Three working features (all languages):**
1. **Hover tooltips** — hover a class/method/field name to see full docs.
2. **Dot-triggered completion** — type `map.` to get method/field suggestions.
3. **Signature help** — cursor inside method parens shows parameter hints.

---

## File Map

```
LCAuto/
├── manifest.json          # Extension manifest (MV3, Chrome + Firefox)
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
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
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
| `bridge.js` | ISOLATED | `document_idle` | Reads storage; relays via `window.postMessage` |
| `*-data/*.js` + `injected.js` | MAIN | `document_idle` | Registers providers; holds all API data |

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
hoverDisposable      → registerProvider()            → registerHoverProvider()
completionDisposable → registerCompletionProvider()  → registerCompletionItemProvider()
signatureDisposable  → registerSignatureHelpProvider() → registerSignatureHelpProvider()
```

Providers are registered once per page lifecycle for each language in `SUPPORTED_LANGS`.

### Cross-reload Provider Cleanup (CRITICAL)

Monaco providers are **page-level globals**. If the extension reloads without a
tab refresh, the IIFE re-runs and would register duplicate providers on top of
the still-live old ones — causing doubled/quadrupled hover/completion results.

**Fix:** At IIFE start, call `window.__lcji_cleanup()` if it exists (left by
the previous run), then expose a new one after registration:

```js
// At IIFE start:
if (typeof window.__lcji_cleanup === "function") window.__lcji_cleanup();

// After registerProvider():
window.__lcji_cleanup = function () {
  hoverDisposable?.dispose();
  completionDisposable?.dispose();
  signatureDisposable?.dispose();
  monacoInstance = null;
};
```

### SUPPORTED_LANGS (CRITICAL)

```js
const SUPPORTED_LANGS = ["java", "cpp", "python3"];
```

**Only register for the exact Monaco language IDs that LeetCode actually uses.**
Registering extra IDs (e.g. `"c++"`, `"python"`) causes Monaco to treat them as
wildcards and call those providers on ALL models, producing duplicate results.

Confirmed LeetCode Monaco language IDs (from `window.__lcji_debug()`):
- Java → `"java"`
- C++ → `"cpp"`
- Python 3 → `"python3"`

### Language guards in providers

Every provider callback must guard against cross-language firing:

```js
const modelLang = model.getLanguageId?.() || "";
const modelIsJava   = modelLang === "java";
const modelIsCpp    = modelLang === "cpp" || modelLang === "c++";
const modelIsPython = isPythonLang(modelLang);
const providerIsJava   = langId === "java";
const providerIsCpp    = langId === "cpp" || langId === "c++";
const providerIsPython = isPythonLang(langId);
if (providerIsJava   && !modelIsJava)   return null;
if (providerIsCpp    && !modelIsCpp)    return null;
if (providerIsPython && !modelIsPython) return null;
```

Applied to: `provideHover`, `provideCompletionItems`, `provideSignatureHelp`.

### Key helper functions

| Function | Purpose |
|---|---|
| `getMonaco()` | Resolves Monaco from `window.monaco` or AMD require cache |
| `isMonacoReady(m)` | True only when models/editors exist |
| `onMonacoReady(m)` | Idempotent; sets `monacoInstance`, registers all 3 providers |
| `tryActivate()` | `getMonaco()` + `isMonacoReady()` → `onMonacoReady()` |
| `getApiForLang(langId)` | Returns `JAVA_API`, `CPP_API`, or `PYTHON_API` for the given ID |
| `isPythonLang(langId)` | True for `"python"`, `"python3"`, or any ID containing `"python"` |
| `registerProvider()` | Registers HoverProvider for each lang in `SUPPORTED_LANGS` |
| `registerCompletionProvider()` | Dot-triggered; uses `resolveTypeForLang()` |
| `registerSignatureHelpProvider()` | `(` and `,` triggered; uses `findSignatureContext()` |
| `buildHover(token, line, range, api)` | Dispatches to class or method tooltip builder |
| `resolveType(name, model, pos)` | Scans upward for Java variable declarations |
| `resolveTypeCpp(name, model, pos, api)` | Same logic but handles C++ qualifiers (`const`, `*`, `&`) |
| `resolveTypePython(name, model, pos, api)` | Handles Python annotations, literals, constructor calls |
| `resolveTypeForLang(name, model, pos, langId, api)` | Dispatches to the right resolver |
| `findSignatureContext()` | Backward paren scan to find enclosing method call |
| `narrowByContext()` | Prefers class mentioned on same line for ambiguous methods |
| `exposeCleanup()` | Updates `window.__lcji_cleanup` after each registration |

### Enable/disable toggle

- `popup.js` writes `{ enabled: bool }` to storage via `_ext.storage.sync`.
- `bridge.js` relays via `postMessage { source: "lc-intellisense-bridge", enabled }`.
- `injected.js` disposes or re-registers all 3 providers.

---

## Data Schema (all three languages share this)

```ts
interface API { [className: string]: ClassEntry; }

interface ClassEntry {
  package: string;        // "java.util" | "std (<vector>)" | "builtins" | "heapq" …
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

**For free functions** (C++ `sort`/`min`, Python `heapq`/`math`): store under a
pseudo-class key (`"algorithm"`, `"heapq"`, `"math"`) and put functions as
methods. The signature-help fallback search finds them automatically.

**For Python type resolution**, `resolveTypePython` checks (in order):
1. Direct API key match — `api["list"]`, `api["math"]`, etc.
2. Type annotation — `x: list` or `x: list[int]`
3. Literal initializer — `x = []` → `list`, `x = {}` → `dict`, `x = ()` → `tuple`
4. Constructor call — `x = deque()`, `x = Counter(nums)`, `x = defaultdict(int)`

**C++ type resolution** (`resolveTypeCpp`) handles:
- Declarations: `vector<int> v`, `const unordered_map<int,int>& mp`
- Constructor: `v = vector<int>(n, 0)`
- Range-for: `for (string s : vec)`

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

### 5. Duplicate hover/completion results after extension reload
Caused by Monaco provider accumulation (old providers remain after IIFE re-runs).
Fixed by `window.__lcji_cleanup` called at IIFE start. Do NOT register for
extra language IDs — only `["java", "cpp", "python3"]`.

### 6. `*/` inside JSDoc block comments
A `*/` sequence inside `/** … */` terminates the comment early → SyntaxError.
Always write: `pointer (*) and reference (&)` instead of `const/*/&`.

---

## How to Test

**Chrome / Brave:**
1. `chrome://extensions` → Developer mode → **Load unpacked** → select project folder
2. Navigate to a LeetCode problem, pick a language

**Firefox:**
1. `about:debugging` → **This Firefox** → **Load Temporary Add-on** → `manifest.json`
2. Navigate to a LeetCode problem → select Java, C++, or Python 3

**Diagnostics (all browsers):**
```js
window.__lcji_debug()          // Full diagnostic report (run in DevTools console)
window.__lcji_forceActivate()  // Force re-activation
```

Expected healthy output:
```
enabled: true
monacoInstance: ✅ found
hoverDisposable: ✅ registered
completionDisposable: ✅ registered
signatureDisposable: ✅ registered
JAVA_API:   ✅ loaded (33 classes)
CPP_API:    ✅ loaded (14 classes)
PYTHON_API: ✅ loaded (14 classes)
window.monaco: ✅ present
Monaco ready? ✅ yes
```

---

## Extension Permissions

Only `"storage"` — for the enable/disable toggle.
Match pattern: `"https://leetcode.com/*"`.
No network access, no tabs access, no host permissions beyond LeetCode.
