/**
 * bridge.js — ISOLATED world
 *
 * Cannot access window.monaco, but CAN use browser.storage.
 * Relays the enabled/disabled toggle state to injected.js (MAIN world)
 * via window.postMessage.
 */

const MSG_SOURCE = "lc-intellisense-bridge";

function postState(enabled) {
  window.postMessage({ source: MSG_SOURCE, enabled }, "*");
}

// On load: read initial state and send it to MAIN world
browser.storage.sync.get({ enabled: true }).then(({ enabled }) => {
  postState(enabled);
});

// Live updates: when the user toggles the popup, relay immediately
browser.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && "enabled" in changes) {
    postState(changes.enabled.newValue);
  }
});
