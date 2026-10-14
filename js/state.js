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

const ELEMENT_SPEECH_NAMES = {
  en: {
    H: "hydrogen", C: "carbon", N: "nitrogen", O: "oxygen", S: "sulfur",
    Pb: "lead", Hg: "mercury", Cd: "cadmium", Cu: "copper", Se: "selenium",
    Zn: "zinc", Ba: "barium", Ca: "calcium", P: "phosphorus", Ti: "titanium"
  },
  pt: {
    H: "hidrogênio", C: "carbono", N: "nitrogênio", O: "oxigênio", S: "enxofre",
    Pb: "chumbo", Hg: "mercúrio", Cd: "cádmio", Cu: "cobre", Se: "selênio",
    Zn: "zinco", Ba: "bário", Ca: "cálcio", P: "fósforo", Ti: "titânio"
  }
};

function joinSpeechList(items, lang) {
  if (items.length < 2) return items[0] || "";

  const conjunction = lang === "pt" ? " e " : " and ";
  if (items.length === 2) return items.join(conjunction);
  return `${items.slice(0, -1).join(", ")},${conjunction}${items[items.length - 1]}`;
}

function getSpeechElementNames(atoms, lang) {
  if (!Array.isArray(atoms)) return [];

  const names = ELEMENT_SPEECH_NAMES[lang] || ELEMENT_SPEECH_NAMES.en;
  return [...new Set(atoms.map(({ element }) => names[element] || element).filter(Boolean))];
}

function toggleTextToSpeech() {
  if (typeof APP_CONFIG === "undefined") return false;

  APP_CONFIG.enableTTS = !APP_CONFIG.enableTTS;
  if (!APP_CONFIG.enableTTS && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  return APP_CONFIG.enableTTS;
}

function cycleLanguage() {
  const currentLanguage = typeof APP_CONFIG !== "undefined" && APP_CONFIG.language === "pt" ? "pt" : "en";
  const nextLanguage = currentLanguage === "en" ? "pt" : "en";
  const nextUrl = new URL(window.location.href);

  nextUrl.searchParams.set("lang", nextLanguage);
  window.location.assign(nextUrl.toString());
}

function playSpeechForState(newState) {
  if (!window.speechSynthesis) return;
  if (typeof APP_CONFIG !== 'undefined' && APP_CONFIG.enableTTS === false) return;
  
  window.speechSynthesis.cancel();

  const lang = (typeof APP_CONFIG !== 'undefined' && APP_CONFIG.language) ? APP_CONFIG.language : 'en';
  let textToSpeak = "";

  if (newState === APP_STATES.SELECTION) {
    textToSpeak = lang === 'pt' 
      ? "Esta é uma pintura da artista Benette Casaretto Motta. A pintura mostra um anjo de braços abertos voltado para o observador. Você pode fazer o movimento de pinça em direção à câmera abaixo, o que permite selecionar uma cor e explorar mais sobre o material. Após selecionar uma cor é manter o sinal de pinça sobre o texto aproximar para aprender mais sobre a cor selecionada."
      : "This is a painting by the artist Benette Casaretto Motta. The painting shows an angel with open arms facing the viewer. You can pinch toward the camera below, which allows you to select a color and explore more about the material. After selecting a color, hold the pinch gesture over the text zoom in to learn more about the selected color.";
  } else if (newState === APP_STATES.DETAIL) {
    if (typeof selectedArtworkItem !== 'undefined' && selectedArtworkItem) {
      const isArtist = selectedArtworkItem.type === 'artist';

      if (isArtist) {
        textToSpeak = lang === 'pt'
          ? [`Vamos conhecer mais sobre a artista ${selectedArtworkItem.name}.`, selectedArtworkItem.historicalContext, selectedArtworkItem.structure]
          : [`Let’s learn more about ${selectedArtworkItem.name}.`, selectedArtworkItem.historicalContext, selectedArtworkItem.structure];
      } else if (lang === 'pt') {
        textToSpeak = [
          selectedArtworkItem.name ? `Vamos aprender mais sobre o material ${selectedArtworkItem.name}.` : "Vamos aprender mais sobre o material.",
          selectedArtworkItem.historicalContext,
          hasSpeechContent(selectedArtworkItem.whyColor) ? `A cor visível é assim porque ${selectedArtworkItem.whyColor}.` : "",
          selectedArtworkItem.chemicalStructure ? "Você pode manter o sinal de pinça sobre o botão aproximar para explorar a estrutura molecular." : ""
        ];
      } else {
        textToSpeak = [
          selectedArtworkItem.name ? `Let’s learn more about the material ${selectedArtworkItem.name}.` : "Let’s learn more about the material.",
          selectedArtworkItem.historicalContext,
          hasSpeechContent(selectedArtworkItem.whyColor) ? `The visible color looks like this because ${selectedArtworkItem.whyColor}.` : "",
          selectedArtworkItem.chemicalStructure ? "You can keep the pinch signal over the zoom in button to explore the molecular structure." : ""
        ];
      }

      textToSpeak = textToSpeak.filter(hasSpeechContent).join(" ");
    }
  } else if (newState === APP_STATES.MOLECULE) {
    if (selectedArtworkItem?.chemicalStructure) {
      const structure = selectedArtworkItem.chemicalStructure;
      const elementNames = getSpeechElementNames(structure.atoms, lang);
      const itemStructure = hasSpeechContent(selectedArtworkItem.structure) ? selectedArtworkItem.structure : "";
      const formulaDescription = hasSpeechContent(selectedArtworkItem.formula) && elementNames.length
        ? (lang === "pt"
          ? `A fórmula química descreve uma composição de ${joinSpeechList(elementNames, lang)}.`
          : `The chemical formula describes a compound of ${joinSpeechList(elementNames, lang)}.`)
        : "";
      const atomDescription = elementNames.length
        ? (lang === "pt"
          ? `A legenda identifica ${joinSpeechList(elementNames, lang)}.`
          : `The legend identifies ${joinSpeechList(elementNames, lang)}.`)
        : "";

      textToSpeak = lang === "pt"
        ? [
            `Vamos explorar a estrutura molecular de ${selectedArtworkItem.name}.`,
            itemStructure ? `A estrutura é descrita como ${itemStructure}.` : "",
            formulaDescription,
            atomDescription,
            "Você pode girar o modelo com o movimento de pinça."
          ]
        : [
            `Let’s explore the molecular structure of ${selectedArtworkItem.name}.`,
            itemStructure ? `The structure is described as ${itemStructure}.` : "",
            formulaDescription,
            atomDescription,
            "You can rotate the model with your pinch motion."
          ];

      textToSpeak = textToSpeak.filter(hasSpeechContent).join(" ");
    }
  }

  if (textToSpeak) {
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = lang === 'pt' ? 'pt-BR' : 'en-US';
    window.speechSynthesis.speak(utterance);
  }
}

function setAppState(newState, { announce = true } = {}) {
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
      if (typeof resizeCanvases === "function") {
        resizeCanvases();
      }
    }, 50);
  }
  
  if (announce) {
    playSpeechForState(newState);
  }

  console.log(`→ State: ${newState.toUpperCase()}`);
}
