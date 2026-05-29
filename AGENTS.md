# AGENTS.md — LeetCode Java IntelliSense Extension

Persistent context for AI agents (Antigravity, Copilot, etc.) working on this codebase.
Read this file before making any changes.

---

## Project Overview

A **Firefox (Manifest V3) browser extension** that adds Java hover-tooltip
IntelliSense to LeetCode's Monaco-based code editor.

**Two core features:**
1. **Class tooltips** — hover a class name (e.g. `HashMap`) to see its package,
   description, constructors, fields and a method preview.
2. **Method / field tooltips** — hover a method name (e.g. `charAt`) to see
   all overloads with full signatures, parameter docs, return-value docs and
   throws docs.

---

## File Map

```
LCAuto/
├── manifest.json          # Extension manifest (MV3, Firefox-only)
├── early_hook.js          # MAIN world, document_start — intercepts window.monaco
├── bridge.js              # ISOLATED world — relays storage toggle to injected.js
├── injected.js            # MAIN world, document_idle — registers hover provider
├── java-data/
│   ├── java_lang.js       # window.JAVA_LANG_DATA (String, Integer, Math, …)
│   ├── java_util.js       # window.JAVA_UTIL_DATA (ArrayList, HashMap, …)
│   ├── java_io.js         # window.JAVA_IO_DATA   (BufferedReader, …)
│   └── index.js           # Merges all three → window.JAVA_API
└── popup/
    ├── popup.html
    ├── popup.css
    └── popup.js           # Reads/writes browser.storage.sync { enabled: bool }
```

---

## Architecture & Execution Flow

### World separation

| Script | World | When | Purpose |
|---|---|---|---|
| `early_hook.js` | MAIN | `document_start` | Intercepts `window.monaco` and `monaco.editor.create()` |
| `bridge.js` | ISOLATED | `document_idle` | Reads `browser.storage.sync`; relays via `window.postMessage` |
| `java-data/*.js` + `injected.js` | MAIN | `document_idle` | Registers hover provider; holds all data |

> **ISOLATED world scripts cannot access `window.monaco`.**
> All Monaco interaction must happen in MAIN world scripts.

### Monaco Detection Strategy (layered)

LeetCode assigns `window.monaco` early in its bundle load, but the actual
code editor widget is created later during React's render cycle.
`registerHoverProvider()` works correctly only after at least one editor model
exists. The extension uses four overlapping detection strategies:

1. **`__lc_intellisense_monaco_ready__` custom event** — fired by `early_hook.js`
   the instant `window.monaco` is first assigned. Triggers the poller.
2. **`__lc_intellisense_editor_created__` custom event** — fired by `early_hook.js`
   when `monaco.editor.create()` or `monaco.editor.createModel()` is called.
   This is the *definitive* signal that Monaco is fully active.
3. **Polling** — `setInterval` every 200 ms, max 90 s, calling `getMonaco()` and
   `isMonacoReady()`. Fallback for races / pages where hooks miss the assignment.
4. **MutationObserver on `.monaco-editor` DOM nodes** — restarts the poller or
   re-registers the hover provider after SPA navigation.

### Key helper functions in `injected.js`

| Function | Purpose |
|---|---|
| `getMonaco()` | Resolves Monaco from `window.monaco` or AMD require cache |
| `isMonacoReady(m)` | Returns true only when models/editors exist (real editor active) |
| `onMonacoReady(m)` | Idempotent; sets `monacoInstance`, stops poller, calls `registerProvider()` |
| `tryActivate()` | Combines `getMonaco()` + `isMonacoReady()` → `onMonacoReady()` |
| `registerProvider()` | Disposes old disposable, calls `monacoInstance.languages.registerHoverProvider()` |
| `buildHover()` | Entry point for tooltip content — dispatches to class or method builder |
| `narrowByContext()` | If multiple classes match a method name, prefer the one mentioned on the same line |

### Enable/disable toggle

- `popup.js` writes `{ enabled: bool }` to `browser.storage.sync`.
- `bridge.js` (ISOLATED world) listens to `browser.storage.onChanged` and
  `postMessage`s `{ source: "lc-intellisense-bridge", enabled }` to the page.
- `injected.js` (MAIN world) receives the `message` event and calls
  `hoverDisposable.dispose()` (disable) or `registerProvider()` (enable).

---

## Data Schema (`window.JAVA_API`)

```ts
interface JavaAPI {
  [className: string]: ClassEntry;
}

interface ClassEntry {
  package: string;            // e.g. "java.util"
  kind: "class" | "interface" | "enum";
  description: string;
  constructors: ConstructorEntry[];
  fields?: { [fieldName: string]: FieldEntry };
  methods?: { [methodName: string]: OverloadEntry[] };
}

interface ConstructorEntry {
  signature: string;          // e.g. "ArrayList(int initialCapacity)"
  desc?: string;
  throws?: string;
}

interface FieldEntry {
  type: string;               // e.g. "int"
  desc: string;
}

interface OverloadEntry {
  signature: string;          // e.g. "get(int index)"
  returns?: string;           // return type, e.g. "E"
  returnsDesc?: string;
  params?: ParamEntry[];
  desc?: string;
  throws?: string[];          // e.g. ["IndexOutOfBoundsException — if index is out of range"]
}

interface ParamEntry {
  name: string;
  type: string;
  desc: string;
}
```

`window.JAVA_LANG_DATA`, `window.JAVA_UTIL_DATA`, `window.JAVA_IO_DATA` each
follow the same schema. `index.js` merges them with `Object.assign`.

---

## Common Pitfalls & Known Issues

### 1. `window.require: ❌ absent` in the debug output
**Not an error.** LeetCode's AMD loader is scoped (not exposed as
`window.require`). The extension detects Monaco via `window.monaco` instead.
This warning in `__lcji_debug()` is informational only.

### 2. Hover provider registered but no tooltips appear
- **Most likely cause**: `monacoInstance` was set from `window.monaco` before
  any editor model existed. The provider registration succeeded at the API level
  but the language service hadn't started. Fix: the `isMonacoReady()` guard and
  the `EDITOR_EVENT` listener ensure we wait until `monaco.editor.create()` has
  been called.
- **Second cause**: SPA navigation disposed the old editor. The MutationObserver
  and `EDITOR_EVENT` listener handle re-registration.
- **Emergency escape hatch**: run `window.__lcji_forceActivate()` in the console.

### 3. Extension loaded after Monaco was already set
If the user enables the extension mid-session, `early_hook.js` may miss the
`window.monaco` assignment. The 200 ms poller will still find it within one tick.

### 4. LeetCode CSP
LeetCode's CSP allows extension MAIN-world content scripts. No eval or dynamic
script injection is used, so CSP is not a concern.

### 5. `monaco.editor.create()` hook location
The hook is applied inside `onMonacoSet()` in `early_hook.js`, which runs when
`window.monaco` is first set. If `monaco.editor` doesn't exist at that moment
(very unlikely), the hook silently skips — the poller fallback still catches it.

---

## How to Test

1. Load the extension in Firefox: `about:debugging` → **This Firefox** → **Load Temporary Add-on** → select `manifest.json`.
2. Navigate to any LeetCode problem (e.g. `leetcode.com/problems/two-sum/`).
3. Select **Java** as the language.
4. Open DevTools Console (F12).
5. Run `window.__lcji_debug()` — all entries should show ✅.
6. Hover over `ArrayList`, `HashMap`, `charAt`, `parseInt`, etc.

### Debug helpers
```js
window.__lcji_debug()           // Full diagnostic report
window.__lcji_forceActivate()  // Force re-activation if provider wasn't registered
```

---

## Adding New Java Classes

1. Choose the appropriate data file (`java_lang.js`, `java_util.js`, `java_io.js`)
   or create a new one (e.g. `java-data/java_concurrent.js`).
2. Follow the `ClassEntry` schema above.
3. If adding a new file:
   - Export as `window.JAVA_XXXXXX_DATA = { ... }`.
   - Add the `<script>` load to `manifest.json` **before** `index.js`.
   - Merge it in `index.js`: `window.JAVA_XXXXXX_DATA || {}`.

---

## Extension Permissions

Only `"storage"` is requested (for the enabled/disabled toggle).
No `tabs`, `scripting`, `activeTab`, or host permissions beyond the match pattern.
The match pattern `"https://leetcode.com/*"` restricts injection to LeetCode only.

---

## Browser Compatibility

Targets **Firefox only** (uses `browser.*` API namespace).
For Chrome, `browser.*` would need to be replaced with `chrome.*`
(or a polyfill added). The `browser_specific_settings.gecko` block in
`manifest.json` will prevent Chrome from loading it.
