/**
 * Material Detail View Module
 * Handles Phase 2 detail card rendering, highlight animations, and smooth text scrolling.
 */
const MaterialView = (() => {
  const AUTO_SCROLL_SPEED = 8;
  const AUTO_SCROLL_START_DELAY = 2000;
  const AUTO_SCROLL_END_PAUSE = 5000;
  const autoScrollStates = new Map();

  function formatTextParagraphs(value) {
    return String(value || "")
      .split(/\n\s*\n/)
      .map((paragraph) => `<p>${paragraph.trim()}</p>`)
      .join("");
  }

  function updateSlowTextScroll(element) {
    if (!element) return;
    const existingState = autoScrollStates.get(element);
    if (existingState) {
      cancelAnimationFrame(existingState.animationFrame);
      autoScrollStates.delete(element);
    }

    element.classList.remove("is-scrollable");
    requestAnimationFrame(() => {
      if (element.scrollHeight <= element.clientHeight + 4) return;

      element.classList.add("is-scrollable");

      const state = {
        animationFrame: null,
        direction: 1,
        lastTimestamp: performance.now(),
        pauseUntil: performance.now() + AUTO_SCROLL_START_DELAY
      };

      const pause = () => {
        state.pauseUntil = performance.now() + 4000;
      };

      const scroll = (timestamp) => {
        if (!element.isConnected || element.scrollHeight <= element.clientHeight + 4) {
          autoScrollStates.delete(element);
          return;
        }

        const elapsedSeconds = Math.min((timestamp - state.lastTimestamp) / 1000, 0.1);
        state.lastTimestamp = timestamp;

        if (timestamp >= state.pauseUntil) {
          const maxScrollTop = element.scrollHeight - element.clientHeight;
          element.scrollTop += state.direction * AUTO_SCROLL_SPEED * elapsedSeconds;

          if (element.scrollTop >= maxScrollTop) {
            element.scrollTop = maxScrollTop;
            state.direction = -1;
            state.pauseUntil = timestamp + AUTO_SCROLL_END_PAUSE;
          } else if (element.scrollTop <= 0) {
            element.scrollTop = 0;
            state.direction = 1;
            state.pauseUntil = timestamp + 1800;
          }
        }

        state.animationFrame = requestAnimationFrame(scroll);
      };

      element.onmouseenter = pause;
      element.onwheel = pause;
      autoScrollStates.set(element, state);
      state.animationFrame = requestAnimationFrame(scroll);
    });
  }

  function getMolecularStructureNote(item, isPT) {
    if (item.chemicalStructure) {
      return isPT
        ? `Aproxime para explorar a estrutura molecular de ${item.name}`
        : `Zoom in to explore the molecular structure of ${item.name}`;
    }
    if (item.molecularStructureStatus === "unconfirmed") {
      return isPT
        ? "Explore outros materiais com modelos moleculares associados confirmados."
        : "Explore other materials with confirmed associated molecular models.";
    }
    return "";
  }

  function renderArtworkDetail(item, elements) {
    const { detailTitle, detailSubtitle, materialContent, materialEmpty } = elements;
    if (!item) return;

    const isPT = typeof APP_CONFIG !== "undefined" && APP_CONFIG.language === "pt";
    const isArtist = item.id === "benette_casaretto_signature";

    const imageUrl = item.image || item.artistImage || "";
    const imageAlt = item.name;

    detailTitle.textContent = item.name;
    detailSubtitle.textContent = isArtist
      ? (isPT ? "Aqui você pode conhecer o artista" : "Here you can get to know the artist")
      : (isPT ? "Aqui você pode conhecer o material" : "Here you can get to know the material");

    const html = `
      <div class="material-image-section">
        <img src="${imageUrl}" alt="${imageAlt}" class="material-image" decoding="async" />
      </div>

      <div class="material-color-indicator" style="background: ${item.color};"></div>
      
      <div class="material-section">
        <div class="material-section-title">${isPT ? "Contexto Histórico & Cultural" : "Historical & Cultural Context"}</div>
        <div class="material-text">${formatTextParagraphs(item.historicalContext)}</div>
      </div>

      ${!isArtist && item.whyColor ? `
      <div class="material-section">
        <div class="material-section-title">${isPT ? "Contexto da Cor" : "Color Context"}</div>
        <div class="material-text">${formatTextParagraphs(item.whyColor)}</div>
      </div>
      ` : ""}

      ${getMolecularStructureNote(item, isPT) ? `<div class="material-note">${getMolecularStructureNote(item, isPT)}</div>` : ""}
    `;

    materialContent.innerHTML = html;
    updateSlowTextScroll(materialContent);

    const materialImage = materialContent.querySelector(".material-image");
    if (materialImage) {
      materialImage.addEventListener("error", () => {
        materialImage.hidden = true;
        materialImage.parentElement.classList.add("material-image-missing");
        materialImage.parentElement.insertAdjacentHTML(
          "beforeend",
          `<p class="material-image-error">${isPT ? "Imagem não encontrada" : "Image unavailable"}</p>`
        );
      }, { once: true });
    }

    materialEmpty.style.display = "none";
    materialContent.style.display = "block";
  }

  return {
    renderArtworkDetail,
    updateSlowTextScroll,
    formatTextParagraphs
  };
})();

window.MaterialView = MaterialView;
