const APP_STATES = {
  SELECTION: "selection",
  DETAIL: "detail",
  MOLECULE: "molecule"
};

let appState = APP_STATES.SELECTION;
let selectedArtworkItem = null;

function setAppState(newState) {
  if (appState !== newState && typeof consumePinchGesture === "function") {
    consumePinchGesture();
  }

  appState = newState;
  document.body.className = `app-state-${newState}`;

  if (newState === APP_STATES.SELECTION) {
    if (typeof handTrackingEnabled !== "undefined" && handTrackingEnabled) {
      magnifier.classList.add("active");
    }
  } else {
    if (typeof magnifier !== "undefined") {
      magnifier.classList.remove("active");
    }
  }

  if (newState === APP_STATES.SELECTION) {
    setTimeout(() => {
      if (typeof initializeSafeZone === "function") {
        initializeSafeZone();
      }
    }, 50);
  }

  console.log(`→ State: ${newState.toUpperCase()}`);
}
