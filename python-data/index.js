// python-data/index.js — MAIN world, document_idle
// Merges all Python data into window.PYTHON_API

window.PYTHON_API = Object.assign(
  {},
  window.PY_BUILTINS_DATA || {},
  window.PY_STDLIB_DATA   || {}
);
