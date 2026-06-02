// cpp-data/index.js — MAIN world, document_idle
// Merges all C++ data parts into window.CPP_API

window.CPP_API = Object.assign(
  {},
  window.CPP_STL_DATA_A  || {},
  window.CPP_STL_DATA_B  || {},
  window.CPP_ALGO_DATA   || {}
);
