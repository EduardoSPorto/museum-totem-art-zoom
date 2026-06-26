const APP_STATES = {
  SELECTION: "selection",
  DETAIL: "detail",
  MOLECULE: "molecule"
};

let appState = APP_STATES.SELECTION;
let selectedPigment = null;

function setAppState(newState) {
  appState = newState;
  document.body.className = `app-state-${newState}`;

  if (newState === APP_STATES.SELECTION) {
    if (handTrackingEnabled) {
      magnifier.classList.add("active");
    }
  } else {
    magnifier.classList.remove("active");
  }

  if (newState === APP_STATES.SELECTION) {
    setTimeout(() => initializeSafeZone(), 50);
  }

  if (newState === APP_STATES.MOLECULE) {
    setTimeout(() => {
      if (!scene) {
        initializeMoleculeScene();
      }
    }, 50);
  }

  console.log(`→ State: ${newState.toUpperCase()}`);
}
