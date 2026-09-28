/**
 * Molecule Renderer Module
 * Encapsulates 3Dmol viewer lifecycle, format detection, crystal lattice generation,
 * MOL data normalization, and WebGL resource management.
 */
const MoleculeRenderer = (() => {
  let activeViewer = null;
  let renderVersion = 0;
  let isRendering = false;
  const fileCache = {};
  const periodicCifCache = new Map();

  const elementColors = {
    H: "#ffffff",
    C: "#4d4d4d",
    N: "#3050f8",
    O: "#ff0d0d",
    S: "#ffd700",
    Cu: "#c87533",
    Cd: "#e53935",
    Pb: "#575961",
    P: "#E67E22",
    Ca: "#B8C0CC"
  };

  function waitForNextPaint() {
    return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  }

  function disposeViewer(viewportElement) {
    renderVersion += 1;
    if (activeViewer) {
      try {
        if (typeof activeViewer.clear === "function") activeViewer.clear();
      } catch (e) {}
      activeViewer = null;
    }
    if (viewportElement) {
      viewportElement.replaceChildren();
    }
    isRendering = false;
  }

  function detectStructureFormat(molPath, molData) {
    if (/V2000|V3000/.test(molData)) return "sdf";
    return molPath.toLowerCase().endsWith(".cif") ? "cif" : "sdf";
  }

  function normalizeMolData(molData) {
    const lines = molData.replace(/\r\n/g, "\n").split("\n");
    const countsLineIndex = lines.findIndex((line) => line.includes("V2000"));
    if (countsLineIndex === -1) return molData;

    const countsLine = lines[countsLineIndex];
    const countMatch = countsLine.match(/(?:^|\s)(\d{3})(\d{3})\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+V2000/);
    const countParts = countsLine.trim().split(/\s+/);
    const compactCounts = countParts[0].match(/^(\d{3})(\d{3})$/);
    const atomCount = Number.parseInt(countMatch?.[1] || compactCounts?.[1] || countParts[0], 10);
    const bondCount = Number.parseInt(countMatch?.[2] || compactCounts?.[2] || countParts[1], 10);
    if (!Number.isFinite(atomCount) || !Number.isFinite(bondCount)) return molData;

    const normalized = [...lines];
    const bondStartIndex = countsLineIndex + 1 + atomCount;
    const actualBondCount = normalized
      .slice(bondStartIndex)
      .findIndex((line) => line.trim().startsWith("M  END"));
    const normalizedBondCount = actualBondCount >= 0 ? actualBondCount : bondCount;
    normalized[countsLineIndex] = `${String(atomCount).padStart(3)}${String(normalizedBondCount).padStart(3)}  0  0  0  0  0  0  0 0999 V2000`;

    for (let i = 0; i < atomCount; i += 1) {
      const lineIndex = countsLineIndex + 1 + i;
      const parts = (normalized[lineIndex] || "").trim().split(/\s+/);
      if (parts.length < 4) continue;

      const x = Number.parseFloat(parts[0]);
      const y = Number.parseFloat(parts[1]);
      const z = Number.parseFloat(parts[2]);
      const element = parts[3];
      normalized[lineIndex] = `${x.toFixed(4).padStart(10)}${y.toFixed(4).padStart(10)}${z.toFixed(4).padStart(10)} ${element.padEnd(3)} 0  0  0  0  0  0  0  0  0  0  0  0`;
    }

    for (let i = 0; i < normalizedBondCount; i += 1) {
      const lineIndex = bondStartIndex + i;
      const parts = (normalized[lineIndex] || "").trim().split(/\s+/);
      if (parts.length < 3) continue;

      let bondParts = parts;
      if (/^\d{5,6}$/.test(parts[0])) {
        bondParts = [parts[0].slice(0, -3), parts[0].slice(-3), ...parts.slice(1)];
      }
      if (bondParts.length < 3) continue;

      normalized[lineIndex] = `${bondParts[0].padStart(3)}${bondParts[1].padStart(3)}${bondParts[2].padStart(3)}  0  0  0  0`;
    }

    return normalized.join("\n");
  }

  function buildPeriodicCifDisplay(cifData) {
    if (periodicCifCache.has(cifData)) {
      return periodicCifCache.get(cifData);
    }
    const cellValue = (name) => {
      const match = cifData.match(new RegExp(`^${name}\\s+([0-9.Ee+-]+)`, "m"));
      return match ? Number.parseFloat(match[1]) : NaN;
    };
    const cellA = cellValue("_cell_length_a");
    const cellB = cellValue("_cell_length_b");
    const cellC = cellValue("_cell_length_c");
    const alpha = cellValue("_cell_angle_alpha") * Math.PI / 180;
    const beta = cellValue("_cell_angle_beta") * Math.PI / 180;
    const gamma = cellValue("_cell_angle_gamma") * Math.PI / 180;
    const cellCosGamma = Math.cos(gamma);
    const cellSinGamma = Math.sin(gamma);
    const cellVectorA = { x: cellA, y: 0, z: 0 };
    const cellVectorB = { x: cellB * cellCosGamma, y: cellB * cellSinGamma, z: 0 };
    const cellVectorC = {
      x: cellC * Math.cos(beta),
      y: cellC * (Math.cos(alpha) - Math.cos(beta) * cellCosGamma) / cellSinGamma,
      z: Math.sqrt(Math.max(0, cellC ** 2 - (cellC * Math.cos(beta)) ** 2 -
        (cellC * (Math.cos(alpha) - Math.cos(beta) * cellCosGamma) / cellSinGamma) ** 2))
    };
    const toCartesian = (fractional, translation = { x: 0, y: 0, z: 0 }) => ({
      x: (fractional.x + translation.x) * cellVectorA.x + (fractional.y + translation.y) * cellVectorB.x + (fractional.z + translation.z) * cellVectorC.x,
      y: (fractional.y + translation.y) * cellVectorB.y + (fractional.z + translation.z) * cellVectorC.y,
      z: (fractional.z + translation.z) * cellVectorC.z
    });
    const tokenize = (line) => line.match(/'[^']*'|"[^"]*"|\S+/g)?.map((token) => token.replace(/^['"]|['"]$/g, "")) || [];
    const lines = cifData.replace(/\r\n/g, "\n").split("\n");
    const atomHeaders = [];
    let atomRowsStart = -1;
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
      const header = lines[lineIndex].trim();
      if (!header.startsWith("_atom_site_")) {
        if (atomHeaders.length && atomRowsStart < 0) atomRowsStart = lineIndex;
        continue;
      }
      atomHeaders.push(header);
    }
    const headerIndex = (name) => atomHeaders.findIndex((header) => header === name);
    const elementIndex = headerIndex("_atom_site_type_symbol");
    const xIndex = headerIndex("_atom_site_fract_x");
    const yIndex = headerIndex("_atom_site_fract_y");
    const zIndex = headerIndex("_atom_site_fract_z");
    const atoms = [];
    if (atomRowsStart >= 0 && elementIndex >= 0 && xIndex >= 0 && yIndex >= 0 && zIndex >= 0) {
      for (let lineIndex = atomRowsStart; lineIndex < lines.length; lineIndex += 1) {
        const line = lines[lineIndex].trim();
        if (!line || line.startsWith("_") || line === "loop_" || line.startsWith("data_")) break;
        const values = tokenize(line);
        const fractional = {
          x: Number.parseFloat(values[xIndex]),
          y: Number.parseFloat(values[yIndex]),
          z: Number.parseFloat(values[zIndex])
        };
        if (values[elementIndex] && Object.values(fractional).every(Number.isFinite)) {
          atoms.push({ element: values[elementIndex], fractional });
        }
      }
    }
    if (!atoms.length || ![cellA, cellB, cellC, alpha, beta, gamma].every(Number.isFinite)) return null;

    const positions = atoms.map((atom) => ({
      element: atom.element,
      point: toCartesian(atom.fractional)
    }));
    const imageIndex = new Map();
    const bonds = [];
    const covalentRadii = { H: 0.31, C: 0.76, N: 0.71, O: 0.66, S: 1.05, Ca: 1.76, Cd: 1.44 };
    const distanceSquared = (first, second) => {
      const dx = first.x - second.x;
      const dy = first.y - second.y;
      const dz = first.z - second.z;
      return dx * dx + dy * dy + dz * dz;
    };

    for (let atomIndex = 0; atomIndex < atoms.length; atomIndex += 1) {
      const atom = atoms[atomIndex];
      const neighbors = [];
      for (let candidateIndex = 0; candidateIndex < atoms.length; candidateIndex += 1) {
        for (let tx = -1; tx <= 1; tx += 1) {
          for (let ty = -1; ty <= 1; ty += 1) {
            for (let tz = -1; tz <= 1; tz += 1) {
              const translation = { x: tx, y: ty, z: tz };
              const candidatePoint = toCartesian(atoms[candidateIndex].fractional, translation);
              neighbors.push({ candidateIndex, translation, point: candidatePoint, distance: distanceSquared(positions[atomIndex].point, candidatePoint) });
            }
          }
        }
      }
      neighbors.sort((first, second) => first.distance - second.distance);
      const radius = covalentRadii[atom.element] || 1;
      const selectedNeighbors = neighbors.filter((neighbor) => {
        const candidateRadius = covalentRadii[atoms[neighbor.candidateIndex].element] || 1;
        const maxDistance = radius + candidateRadius + (atom.element === "Ca" || atoms[neighbor.candidateIndex].element === "Ca" ? 0.7 : 0.45);
        return neighbor.distance <= maxDistance ** 2 && neighbor.distance > 0.25;
      }).slice(0, 6);
      for (const neighbor of selectedNeighbors) {
        const translationKey = `${neighbor.candidateIndex}:${neighbor.translation.x}:${neighbor.translation.y}:${neighbor.translation.z}`;
        let positionIndex = imageIndex.get(translationKey);
        if (positionIndex === undefined) {
          if (neighbor.translation.x === 0 && neighbor.translation.y === 0 && neighbor.translation.z === 0) {
            positionIndex = neighbor.candidateIndex;
          } else {
            positionIndex = positions.length;
            positions.push({ element: atoms[neighbor.candidateIndex].element, point: neighbor.point });
          }
          imageIndex.set(translationKey, positionIndex);
        }
        bonds.push({
          start: positions[atomIndex].point,
          end: positions[positionIndex].point,
          startElement: atom.element,
          endElement: atoms[neighbor.candidateIndex].element
        });
      }
    }

    const result = {
      xyz: `${positions.length}\nPeriodic CdS coordination display\n${positions.map((atom) => `${atom.element} ${atom.point.x.toFixed(6)} ${atom.point.y.toFixed(6)} ${atom.point.z.toFixed(6)}`).join("\n")}`,
      positions,
      bonds
    };
    periodicCifCache.set(cifData, result);
    return result;
  }

  async function loadMoleculeFile(molPath) {
    if (fileCache[molPath]) return fileCache[molPath];
    const response = await fetch(molPath);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    let molData = await response.text();
    molData = normalizeMolData(molData);
    fileCache[molPath] = molData;
    return molData;
  }

  function getViewer() {
    return activeViewer;
  }

  function setViewer(viewer) {
    activeViewer = viewer;
  }

  function getRenderVersion() {
    return renderVersion;
  }

  function incrementRenderVersion() {
    renderVersion += 1;
    return renderVersion;
  }

  return {
    waitForNextPaint,
    disposeViewer,
    detectStructureFormat,
    buildPeriodicCifDisplay,
    loadMoleculeFile,
    getViewer,
    setViewer,
    getRenderVersion,
    incrementRenderVersion,
    elementColors
  };
})();

window.MoleculeRenderer = MoleculeRenderer;
