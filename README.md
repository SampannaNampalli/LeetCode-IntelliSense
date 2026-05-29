# LeetCode Java IntelliSense

A **Firefox browser extension** that adds Java hover-tooltip IntelliSense to LeetCode's Monaco-based code editor — similar to what you'd get in VS Code or IntelliJ.

## Features

- 🔷 **Class tooltips** — hover a class name (`HashMap`, `ArrayList`, `StringBuilder`…) to see its package, description, constructors, fields, and a method preview
- 🔍 **Method / field tooltips** — hover a method name (`charAt`, `parseInt`, `put`…) to see all overloads with full signatures, parameter docs, return-value docs, and throws docs
- 🎯 **Context narrowing** — if multiple classes share a method name, the extension prefers the one mentioned on the same line
- 🔘 **Toggle** — enable/disable via the toolbar popup without reloading the page

## Demo

Hover over `ArrayList` in the Java editor:

```
🔷 `ArrayList`
*java.util*

---
A resizable array implementation of the List interface…

**Constructors**

​```java
ArrayList()
​```
Constructs an empty list with an initial capacity of ten.

**Methods** *(hover a method name for details)*

`add()`  ·  `get()`  ·  `size()`  ·  `remove()`  ·  `contains()`  ·  `set()`
```

Hover over `charAt`:

```
🔷 `String.charAt` — *java.lang*

​```java
char charAt(int index)
​```
Returns the char value at the specified index.

- `int` **index** — The index of the char value.

↩ *Returns:* The char value at the specified index.
⚠ *Throws:* `IndexOutOfBoundsException — if index is negative or not less than length()`
```

## Covered Java Classes

| Package | Classes |
|---|---|
| `java.lang` | `String`, `StringBuilder`, `Integer`, `Long`, `Double`, `Character`, `Boolean`, `Math`, `Object`, `System` |
| `java.util` | `ArrayList`, `LinkedList`, `HashMap`, `LinkedHashMap`, `TreeMap`, `HashSet`, `LinkedHashSet`, `TreeSet`, `ArrayDeque`, `PriorityQueue`, `Stack`, `Collections`, `Arrays`, `Scanner`, `Random`, `Optional` |
| `java.io` | `BufferedReader`, `InputStreamReader`, `PrintWriter`, `StringReader` |

## Installation

This is a **Firefox-only** extension (uses the `browser.*` API). Chrome is not supported.

### Load as a temporary add-on (development)

1. Open Firefox and navigate to `about:debugging`
2. Click **This Firefox** in the left sidebar
3. Click **Load Temporary Add-on…**
4. Navigate to the project folder and select `manifest.json`
5. Go to any [LeetCode problem](https://leetcode.com/problems/two-sum/), select **Java**, and hover!

> **Note:** Temporary add-ons are removed when Firefox restarts. For persistent installation, the extension would need to be signed by Mozilla.

### Permanent installation (self-signed)

1. Install [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/): `npm install -g web-ext`
2. In the project directory: `web-ext build`
3. In Firefox: `about:addons` → gear icon → **Install Add-on From File** → select the generated `.zip`

> Firefox requires add-ons to be signed unless you use [Firefox Developer Edition or Nightly](https://extensionworkshop.com/documentation/publish/signing-and-distribution-overview/) with `xpinstall.signatures.required` set to `false` in `about:config`.

## Diagnostics

Open DevTools (F12) on a LeetCode problem and run:

```js
window.__lcji_debug()        // full diagnostic report
window.__lcji_forceActivate() // force re-activate if hover isn't working
```

Expected healthy output:
```
enabled: true
monacoInstance: ✅ found
hoverDisposable: ✅ registered
JAVA_API: ✅ loaded (33 classes)
window.monaco: ✅ present
Monaco ready? ✅ yes
```

## Adding New Java Classes

1. Open the appropriate file in `java-data/` (`java_lang.js`, `java_util.js`, `java_io.js`) or create a new one
2. Follow the existing `ClassEntry` schema:

```js
"ClassName": {
  package: "java.util",
  kind: "class",           // "class" | "interface" | "enum"
  description: "...",
  constructors: [
    { signature: "ClassName()", desc: "..." }
  ],
  fields: {
    "FIELD_NAME": { type: "int", desc: "..." }
  },
  methods: {
    "methodName": [
      {
        signature: "methodName(int index)",
        returns: "E",
        returnsDesc: "The element at the index.",
        params: [{ name: "index", type: "int", desc: "The index." }],
        desc: "Returns the element at the specified position.",
        throws: ["IndexOutOfBoundsException — if index is out of range"]
      }
    ]
  }
}
```

3. If adding a **new file**: export as `window.JAVA_XXXXXX_DATA = { ... }`, add a `<script>` entry in `manifest.json` before `index.js`, and merge it in `java-data/index.js`

## Project Structure

```
LCAuto/
├── manifest.json          # MV3 extension manifest (Firefox only)
├── early_hook.js          # MAIN world, document_start — intercepts window.monaco
├── bridge.js              # ISOLATED world — relays storage toggle to injected.js
├── injected.js            # MAIN world, document_idle — registers hover provider
├── java-data/
│   ├── java_lang.js       # java.lang classes (String, Integer, Math…)
│   ├── java_util.js       # java.util classes (ArrayList, HashMap…)
│   ├── java_io.js         # java.io classes (BufferedReader…)
│   └── index.js           # Merges all → window.JAVA_API
├── popup/
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## How It Works

LeetCode's code editor is built on [Monaco Editor](https://microsoft.github.io/monaco-editor/). Monaco exposes a `languages.registerHoverProvider()` API that extensions can use to provide custom hover content.

The tricky part: LeetCode assigns `window.monaco` early but creates the actual editor widget asynchronously during its React render cycle — and explicitly disables Monaco's native hover widget (it uses its own custom IntelliSense panel instead).

This extension works around that with three layers:

1. **`early_hook.js`** (runs at `document_start`, MAIN world) intercepts `window.monaco` assignment via `Object.defineProperty`, then patches `monaco.editor.create()` to force `hover: { enabled: true }` into the editor's options before Monaco constructs it — synchronously, so LeetCode cannot override it afterwards
2. **`injected.js`** listens for both the `window.monaco` assignment event and the `monaco.editor.create()` hook event to register the hover provider at the right moment
3. A **200 ms poller + MutationObserver** handles edge cases (SPA navigation, extension loaded mid-session)

## Permissions

Only `"storage"` is requested — solely to persist the enabled/disabled toggle across browser restarts. No host permissions, no tabs access, no network access.

## License

MIT — see [LICENSE](LICENSE)
