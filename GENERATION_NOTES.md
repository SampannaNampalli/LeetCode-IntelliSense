# Generation Errors & Constraints

Notes for AI agents on known error conditions and how to avoid them.

---

## ERROR: `generation exceeded max tokens limit` (64 000 tokens)

### What it is
A **per-response output token limit** — not a daily or session limit.
Each single model response (text + tool calls combined) cannot exceed ~64 000 output tokens.

### When it triggers in this project
- Generating a large data file (e.g. `cpp_stl.js`) in a single tool call.
  The Java data files are 64–83 KB each; a similarly detailed C++ file will hit the limit.
- Having a very long thinking block AND a large file write in the same response.
- Retrying with the exact same output → all retries also fail.

### How to avoid it
1. **Split large file generation** — write one section per response (e.g. Part A then Part B).
2. **Keep thinking blocks minimal** when the output will be large.
3. **Safe line limits per tool call** (dense JS with string literals): ~600–900 lines.
4. **Never attempt monolithic writes** of files >40 KB in a single tool call.

---

## ERROR: `model output must contain either output text or tool calls`

### What it is
The model produced only a `<thinking>` block with no visible text and no tool calls.

### How to avoid it
Always include either a text response or at least one tool call in every turn.

---

## STRATEGY: Large file generation

When a data file is too large for one response:
1. Write Part A (first half of classes) as `cpp_stl_a.js` → `window.CPP_STL_DATA_A`
2. Write Part B (second half) as `cpp_stl_b.js` → `window.CPP_STL_DATA_B`
3. Merge in `index.js`: `Object.assign({}, window.CPP_STL_DATA_A, window.CPP_STL_DATA_B, ...)`
4. Load both scripts in `manifest.json` before `index.js`
