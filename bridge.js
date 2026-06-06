/**
 * bridge.js — ISOLATED world
 *
 * Cannot access window.monaco, but CAN use browser/chrome storage.
 * Relays the enabled/disabled toggle state to injected.js (MAIN world)
 * via window.postMessage.
 *
 * Cross-browser: works in both Firefox (browser.*) and Chrome (chrome.*).
 */

// Unified extension API — Firefox exposes `browser`, Chrome exposes `chrome`.
const _ext = (typeof browser !== "undefined") ? browser : chrome;

const MSG_SOURCE = "lc-intellisense-bridge";

function postState(enabled) {
  window.postMessage({ source: MSG_SOURCE, enabled }, "*");
}

// On load: read initial state and send it to MAIN world
_ext.storage.sync.get({ enabled: true }).then(({ enabled }) => {
  postState(enabled);
});

// Live updates: when the user toggles the popup, relay immediately
_ext.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && "enabled" in changes) {
    postState(changes.enabled.newValue);
  }
});
