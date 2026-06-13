# LeetCode IntelliSense

> Hover tooltips, dot-completion, and signature help for **Java**, **C++**, and **Python 3** — directly inside LeetCode's Monaco editor.

Works on **Chrome**, **Firefox**, **Brave**, and any Chromium-based browser.

---

## Features

### 🔍 Hover Tooltips
Hover over any class name, method, or field to see full documentation inline.

- **Class hover** — package, description, constructors, fields, and method preview
- **Method hover** — all overloads with signatures, parameter docs, return type, and thrown exceptions
- **Context narrowing** — when multiple classes share a method name, the extension prefers the one referenced on the same line

### ⚡ Dot-triggered Completion
Type `.` after a variable or module name to get a filtered method/field list.

- Resolves the variable's type from its declaration or type annotation
- Supports literal initializers: `x = []` → `list` methods, `x = {}` → `dict` methods
- Works with constructor calls: `x = deque()`, `x = Counter(nums)`, `x = vector<int>()`

### 🔔 Signature Help
Cursor inside `(` or after `,` shows parameter hints with types and descriptions for the current argument position.

### 🔘 Enable / Disable Toggle
Click the toolbar icon to instantly enable or disable IntelliSense without reloading the page.

---

## Language Coverage

### Java
| Package | Classes |
|---|---|
| `java.lang` | `String`, `StringBuilder`, `Integer`, `Long`, `Double`, `Character`, `Boolean`, `Math`, `Object`, `System` |
| `java.util` | `ArrayList`, `LinkedList`, `HashMap`, `LinkedHashMap`, `TreeMap`, `HashSet`, `LinkedHashSet`, `TreeSet`, `ArrayDeque`, `PriorityQueue`, `Stack`, `Collections`, `Arrays`, `Scanner`, `Random`, `Optional` |
| `java.io` | `BufferedReader`, `InputStreamReader`, `PrintWriter`, `StringReader` |

### C++ STL
| Header | Containers / Types |
|---|---|
| `<vector>` | `vector` |
| `<string>` | `string` |
| `<deque>` | `deque` |
| `<utility>` | `pair` |
| `<map>` | `map`, `unordered_map` |
| `<set>` | `set`, `unordered_set` |
| `<stack>` | `stack` |
| `<queue>` | `queue`, `priority_queue` |
| `<list>` | `list` |
| `<algorithm>` | `sort`, `reverse`, `find`, `count`, `min`, `max`, `lower_bound`, `upper_bound`, `binary_search`, `accumulate`, `fill`, `swap`, `next_permutation`, `unique`, `rotate`, `nth_element`, `min_element`, `max_element` |
| `<cstdlib>` / `<cmath>` | `to_string`, `stoi`, `stol`, `stoll`, `abs`, `sqrt`, `pow`, `log` |

### Python 3
| Module | Types / Functions |
|---|---|
| `builtins` | `list`, `dict`, `set`, `str`, `tuple`, `int` |
| `collections` | `deque`, `Counter`, `defaultdict` |
| `heapq` | `heappush`, `heappop`, `heapify`, `heapreplace`, `heappushpop`, `nlargest`, `nsmallest` |
| `math` | `sqrt`, `pow`, `log`, `log2`, `log10`, `ceil`, `floor`, `factorial`, `gcd`, `lcm`, `comb`, `perm`, `inf`, `pi`, `e` |
| `bisect` | `bisect_left`, `bisect_right`, `insort_left`, `insort_right` |
| `itertools` | `combinations`, `permutations`, `product`, `chain`, `accumulate`, `groupby`, `zip_longest` |
| `functools` | `reduce`, `lru_cache`, `cache`, `cmp_to_key`, `partial` |

---

## Installation

### Chrome / Brave (and all Chromium browsers)

1. Download a zip of this repository and unzip it
2. Open `chrome://extensions` (or `brave://extensions`)
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** → select the de-compressed project folder (`LeetCode-IntelliSense-main/`)
5. Navigate to a [LeetCode problem](https://leetcode.com/problems/two-sum/), pick any language, and hover!

### Firefox

#### Method 1:
1. Download from the firefox add-on store: https://addons.mozilla.org/en-US/firefox/addon/intellisense-for-leetcode/

#### Method 2:
1. Download a zip of this repository and unzip it
2. Open `about:debugging` → **This Firefox**
3. Click **Load Temporary Add-on…**
4. Select `manifest.json` inside the decompressed project folder

> **Note:** Temporary add-ons are removed on Firefox restart. For persistent installation, build and sign with [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/):
> ```sh
> npm install -g web-ext
> web-ext build
> ```
> Then install the generated `.zip` via `about:addons` → gear → **Install Add-on From File**.

---

## Diagnostics

Open DevTools (`F12`) on any LeetCode problem and run:

```js
window.__lcji_debug()         // Full diagnostic report
window.__lcji_forceActivate() // Force re-activation if providers aren't working
```

**Healthy output (Python 3 problem):**
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
Models: 2  python3, plaintext
  Editor 0 language: python3
  Editor 1 language: plaintext
```

---

## Project Structure

```
LCAuto/
├── manifest.json          # MV3 manifest — Chrome, Firefox, Brave
├── early_hook.js          # MAIN world, document_start — forces Monaco options
├── bridge.js              # ISOLATED world — relays toggle state via postMessage
├── injected.js            # MAIN world, document_idle — hover, completion, signature providers
├── java-data/
│   ├── java_lang.js       # java.lang (String, Math, Integer…)
│   ├── java_util.js       # java.util (ArrayList, HashMap…)
│   ├── java_io.js         # java.io (BufferedReader…)
│   └── index.js           # → window.JAVA_API
├── cpp-data/
│   ├── cpp_stl_a.js       # vector, string, deque, pair
│   ├── cpp_stl_b.js       # map, set, stack, queue, priority_queue, list…
│   ├── cpp_algorithms.js  # sort, min, max, lower_bound…
│   └── index.js           # → window.CPP_API
├── python-data/
│   ├── py_builtins.js     # list, dict, set, str, tuple, int
│   ├── py_stdlib.js       # deque, Counter, heapq, math, bisect, itertools, functools
│   └── index.js           # → window.PYTHON_API
├── popup/
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## How It Works

LeetCode's code editor is built on [Monaco Editor](https://microsoft.github.io/monaco-editor/). Monaco provides `languages.registerHoverProvider()`, `registerCompletionItemProvider()`, and `registerSignatureHelpProvider()` for exactly this use case.

The tricky part: **LeetCode explicitly disables** Monaco's native hover, suggestion, and parameter-hints widgets to use its own UI overlays. This extension works around that with three layers:

1. **`early_hook.js`** runs at `document_start` in the MAIN world. It intercepts `window.monaco` assignment and patches `monaco.editor.create()` to force `{ hover: {enabled:true}, quickSuggestions: true, parameterHints: {enabled:true}, … }` into the editor options — synchronously, before LeetCode can apply its defaults.

2. **`injected.js`** registers three providers (hover, completion, signature help) for each supported language (`java`, `cpp`, `python3`). A `window.__lcji_cleanup` function is stored on the page so that if the extension reloads without a tab refresh, old providers are disposed before new ones are registered.

3. A **200 ms poller + MutationObserver** handles edge cases: extension loaded after Monaco was already set, SPA navigation between problems, and language switches.

---

## Adding New API Data

All three languages share the same data schema:

```js
"ClassName": {
  package: "java.util",            // or "std (<vector>)", "builtins", "heapq", etc.
  kind: "class",                   // "class" | "interface" | "enum"
  description: "...",
  constructors: [
    { signature: "ClassName()", desc: "..." }
  ],
  fields: {
    "FIELD": { type: "int", desc: "..." }
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

For free functions (C++ algorithms, Python `heapq`/`math`), use a pseudo-class key (e.g. `"algorithm"`, `"heapq"`) and put the functions as methods — the signature-help provider searches all classes automatically.

---

## Permissions

Only `"storage"` — to persist the enable/disable toggle across sessions. No network access, no tab access, no host permissions beyond `https://leetcode.com/*`.

---

## License

MIT — see [LICENSE](LICENSE)
