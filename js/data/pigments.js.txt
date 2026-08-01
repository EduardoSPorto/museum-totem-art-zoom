const PIGMENTS = {
  black: {
    key: "black",
    id: "carbon_black",
    name: "Carbon Black",
    commonName: "Carbon Black",
    formula: "C",
    color: "#000000",
    image: "assets/materials/Carbon_black_000000.jpg",
    imageAlt: "Carbon black pigment",
    description: "A black pigment made of finely divided carbon particles.",
    whyRed: "Carbon black absorbs most visible wavelengths because its carbon-rich structure converts incoming light into heat instead of reflecting it.",
    chemistry: {
      elements: "Carbon (C)",
      structure: "Graphitic carbon particles",
      lightAbsorption: "Broad visible-spectrum absorption"
    },
    historical: "Carbon-based black pigments are among the oldest materials used in drawing and painting.",
    properties: [
      "Very strong tinting strength",
      "High opacity in small amounts",
      "Chemically stable"
    ],
    occurrence: "Produced by incomplete combustion of carbon-rich materials.",
    molecule: {
      name: "Carbon Black",
      formula: "C",
      molecularWeight: 12.01,
      atoms: [
        { element: "C" }
      ],
      bonds: [],
      structure: "Graphitic fragment representative of carbon black"
    }
  },
  blue: {
    key: "blue",
    id: "blue_pigment",
    name: "Blue Pigment",
    commonName: "Azurite",
    formula: "Cu3(CO3)2(OH)2",
    color: "#0000FF",
    image: "assets/materials/placeholder_blue_pigment_0000ff.jpg",
    imageAlt: "Blue pigment",
    description: "A blue pigment represented by azurite in the molecule dataset.",
    whyRed: "Copper ions absorb parts of the visible spectrum and leave blue light dominant in the reflected color.",
    chemistry: {
      elements: "Copper (Cu) + Carbon (C) + Oxygen (O) + Hydrogen (H)",
      structure: "Basic copper carbonate",
      lightAbsorption: "Copper-centered electronic transitions"
    },
    historical: "Copper-based blue pigments such as azurite were widely used before modern synthetic blues.",
    properties: [
      "Distinct blue color",
      "Mineral pigment character",
      "Sensitive to some chemical environments"
    ],
    occurrence: "Naturally occurring copper carbonate mineral.",
    molecule: {
      name: "Azurite",
      formula: "Cu3(CO3)2(OH)2",
      molecularWeight: 344.67,
      atoms: [
        { element: "Cu" },
        { element: "C" },
        { element: "O" }
      ],
      bonds: [],
      structure: "Simplified azurite model"
    }
  },
  red: {
    key: "red",
    id: "lake_red",
    name: "Lake Red",
    commonName: "Lake Red",
    formula: "C14H8O4",
    color: "#FF0000",
    image: "assets/materials/lake_red_Titian_ff0000.jpg",
    imageAlt: "Lake red pigment",
    description: "A red lake pigment represented by an alizarin molecule model.",
    whyRed: "The conjugated organic structure absorbs higher-energy visible light and reflects red wavelengths.",
    chemistry: {
      elements: "Carbon (C) + Hydrogen (H) + Oxygen (O)",
      structure: "Organic lake pigment chromophore",
      lightAbsorption: "Conjugated pi-electron system"
    },
    historical: "Red lake pigments were prized for luminous red glazes in historical painting.",
    properties: [
      "Transparent to semi-transparent",
      "Useful in layered glazes",
      "Color depends on substrate and binder"
    ],
    occurrence: "Prepared by fixing an organic dye onto an inorganic substrate.",
    molecule: {
      name: "Alizarin",
      formula: "C14H8O4",
      molecularWeight: 240.21,
      atoms: [
        { element: "C" },
        { element: "H" },
        { element: "O" }
      ],
      bonds: [],
      structure: "Representative lake pigment molecule"
    }
  },
  signature: {
    key: "signature",
    id: "artist_signature",
    name: "Artist Signature",
    commonName: "Benette Casaretto Motta",
    formula: "Signature",
    color: "#FF00FF",
    image: "assets/materials/Benette_Casaretto_Motta_assinatura_da_artista_TEMP_ff00ff.png",
    imageAlt: "Artist signature",
    description: "The artist signature region from the artwork mask.",
    whyRed: "This mask color identifies the artist signature area rather than a pigment material.",
    chemistry: {
      area: "Artist signature",
      maskColor: "#FF00FF"
    },
    historical: "Signature area for Benette Casaretto Motta.",
    properties: [
      "Mapped from the magenta mask color",
      "Informational artwork region"
    ],
    occurrence: "Artwork annotation region.",
    molecule: {
      name: "Artist Signature",
      formula: "Signature",
      molecularWeight: 0,
      atoms: [],
      bonds: [],
      structure: "No molecule file is available for this artwork region"
    }
  },
  white: {
    key: "white",
    id: "white_pigment",
    name: "White Pigment",
    commonName: "Lead Carbonate",
    formula: "PbCO3",
    color: "#FFFFFF",
    image: "assets/materials/placeholder_white_pigment_ffffff.jpg",
    imageAlt: "White pigment",
    description: "A white pigment represented by a lead carbonate molecule model.",
    whyRed: "White pigment particles scatter visible wavelengths broadly, so the surface reflects light without a strong hue.",
    chemistry: {
      elements: "Lead (Pb) + Carbon (C) + Oxygen (O)",
      structure: "Carbonate pigment",
      opacityMechanism: "Light scattering"
    },
    historical: "Lead carbonate whites were important historical painting pigments.",
    properties: [
      "High covering power",
      "Smooth handling in paint",
      "Toxic because of lead content"
    ],
    occurrence: "Historically manufactured as a lead carbonate pigment.",
    molecule: {
      name: "Lead Carbonate",
      formula: "PbCO3",
      molecularWeight: 267.21,
      atoms: [
        { element: "Pb" },
        { element: "C" },
        { element: "O" }
      ],
      bonds: [],
      structure: "Lead carbonate model"
    }
  },
  yellow: {
    key: "yellow",
    id: "cadmium_yellow",
    name: "Cadmium Yellow",
    commonName: "Cadmium Sulfide",
    formula: "CdS",
    color: "#FFFF00",
    image: "assets/materials/Cadmiumgelb-_Pigment_ffff00.jpg",
    imageAlt: "Cadmium yellow pigment",
    description: "A yellow cadmium sulfide pigment.",
    whyRed: "Cadmium sulfide absorbs shorter blue-violet wavelengths and reflects the yellow portion of visible light.",
    chemistry: {
      elements: "Cadmium (Cd) + Sulfur (S)",
      structure: "Cadmium sulfide crystal",
      bandGap: "Visible-light semiconductor band gap"
    },
    historical: "Cadmium yellow became an important modern yellow pigment because of its strong color and opacity.",
    properties: [
      "Bright saturated yellow",
      "High opacity",
      "Contains cadmium"
    ],
    occurrence: "Synthetic cadmium sulfide pigment.",
    molecule: {
      name: "Cadmium Sulfide",
      formula: "CdS",
      molecularWeight: 144.48,
      atoms: [
        { element: "Cd" },
        { element: "S" }
      ],
      bonds: [],
      structure: "Cadmium sulfide model"
    }
  }
};
