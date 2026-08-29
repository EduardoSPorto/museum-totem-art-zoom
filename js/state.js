const APP_STATES = {
  SELECTION: "selection",
  DETAIL: "detail",
  MOLECULE: "molecule"
};

let appState = APP_STATES.SELECTION;
let selectedArtworkItem = null;

function hasSpeechContent(value) {
  return typeof value === "string" && value.trim() !== "" && value !== "[not informed]";
}

function playSpeechForState(newState) {
  if (!window.speechSynthesis) return;
  if (typeof APP_CONFIG !== 'undefined' && APP_CONFIG.enableTTS === false) return;
  
  window.speechSynthesis.cancel();

  const lang = (typeof APP_CONFIG !== 'undefined' && APP_CONFIG.language) ? APP_CONFIG.language : 'en';
  let textToSpeak = "";

  if (newState === APP_STATES.SELECTION) {
    textToSpeak = lang === 'pt' 
      ? "Esta é uma pintura da artista Benette Casaretto Motta. A pintura mostra um anjo de braços abertos voltado para o observador. Você pode fazer o movimento de pinça em direção à câmera abaixo, o que permite selecionar uma cor e explorar mais sobre o material."
      : "This is a painting by the artist Benette Casaretto Motta. The painting shows an angel with open arms facing the viewer. You can pinch toward the camera below, which allows you to select a color and explore more about the material.";
  } else if (newState === APP_STATES.DETAIL) {
    if (typeof selectedArtworkItem !== 'undefined' && selectedArtworkItem) {
      const isArtist = selectedArtworkItem.type === 'artist';

      if (isArtist) {
        textToSpeak = lang === 'pt'
          ? [`Vamos conhecer mais sobre a artista ${selectedArtworkItem.name}.`, selectedArtworkItem.historicalContext, selectedArtworkItem.originProduction]
          : [`Let’s learn more about ${selectedArtworkItem.name}.`, selectedArtworkItem.historicalContext, selectedArtworkItem.originProduction];
      } else if (lang === 'pt') {
        textToSpeak = [
          "Vamos aprender mais sobre o material.",
          hasSpeechContent(selectedArtworkItem.commonName) ? `${selectedArtworkItem.name} também é chamado pelo nome comum ${selectedArtworkItem.commonName}.` : "",
          selectedArtworkItem.historicalContext,
          hasSpeechContent(selectedArtworkItem.originProduction) ? `Sua origem é descrita como ${selectedArtworkItem.originProduction}.` : "",
          hasSpeechContent(selectedArtworkItem.whyColor) ? `A cor visível é assim porque ${selectedArtworkItem.whyColor}.` : "",
          selectedArtworkItem.chemicalStructure ? "Você pode aproximar para explorar a estrutura molecular." : ""
        ];
      } else {
        textToSpeak = [
          "Let’s learn more about the material.",
          hasSpeechContent(selectedArtworkItem.commonName) ? `${selectedArtworkItem.name} is also known as ${selectedArtworkItem.commonName}.` : "",
          selectedArtworkItem.historicalContext,
          hasSpeechContent(selectedArtworkItem.originProduction) ? `Its origin is described as ${selectedArtworkItem.originProduction}.` : "",
          hasSpeechContent(selectedArtworkItem.whyColor) ? `The visible color looks like this because ${selectedArtworkItem.whyColor}.` : "",
          selectedArtworkItem.chemicalStructure ? "You can zoom in to explore the molecular structure." : ""
        ];
      }

      textToSpeak = textToSpeak.filter(hasSpeechContent).join(" ");
    }
  } else if (newState === APP_STATES.MOLECULE) {
    textToSpeak = lang === 'pt'
      ? "Vamos aprender sobre a estrutura molecular e informações químicas. Você pode arrastar o modelo que vê com o seu movimento de pinça."
      : "Let’s learn about the molecular structure and chemical information. You can drag the model you see with your pinch motion.";
  }

  if (textToSpeak) {
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = lang === 'pt' ? 'pt-BR' : 'en-US';
    window.speechSynthesis.speak(utterance);
  }
}

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
  
  playSpeechForState(newState);

  console.log(`→ State: ${newState.toUpperCase()}`);
}
