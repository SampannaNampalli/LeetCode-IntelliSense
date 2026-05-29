/**
 * index.js — MAIN world
 * Merges all Java API data namespaces into a single window.JAVA_API object.
 * Must be loaded AFTER java_lang.js, java_util.js, java_io.js.
 */
window.JAVA_API = Object.assign(
  {},
  window.JAVA_LANG_DATA || {},
  window.JAVA_UTIL_DATA || {},
  window.JAVA_IO_DATA   || {}
);
