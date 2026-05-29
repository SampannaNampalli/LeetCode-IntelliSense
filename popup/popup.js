/**
 * popup.js
 * Manages the on/off toggle and persists state via browser.storage.sync.
 */

const toggle      = document.getElementById("toggle");
const toggleLabel = document.getElementById("toggle-label");
const toggleDesc  = document.getElementById("toggle-desc");

// ─── Load persisted state ─────────────────────────────────────────────────
browser.storage.sync.get({ enabled: true }).then(({ enabled }) => {
  applyState(enabled, false);
});

// ─── Toggle handler ───────────────────────────────────────────────────────
toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
  browser.storage.sync.set({ enabled });
  applyState(enabled, true);
});

// ─── UI state update ──────────────────────────────────────────────────────
function applyState(enabled, animate) {
  toggle.checked = enabled;

  if (enabled) {
    toggleLabel.textContent = "Active";
    toggleLabel.classList.remove("disabled");
    toggleDesc.textContent  = "Hover tooltips enabled on leetcode.com";
  } else {
    toggleLabel.textContent = "Disabled";
    toggleLabel.classList.add("disabled");
    toggleDesc.textContent  = "Click to re-enable hover tooltips";
  }
}
