const ARTWORK_ITEMS = {
  black: {
    id: "bone_black",
    type: "material",
    color: "#000000",
    image: "assets/materials/Carbon_black_000000.jpg",
    name: "Bone Black",
    commonName: "Bone Black",
    formula: "C + Ca5(OH)(PO4)3",
    historicalContext: "Identified in the black base of Benette Casaretto Motta's painting 'Anjo Adonay'. Historically known as Ivory Black.",
    originProduction: "Produced artificially by carbonizing animal bones in closed vessels.",
    whyColor: "Carbon-rich bone black absorbs most visible light, producing a deep black tone.",
    chemicalStructure: {
      modelName: "Carbon / Hydroxyapatite",
      atoms: [{ element: "C" }]
    }
  },
  blue: {
    id: "blue_color",
    type: "material",
    color: "#0000FF",
    image: "assets/materials/placeholder_blue_pigment_0000ff.jpg",
    name: "Blue Pigment",
    commonName: "Azurite",
    formula: "Cu3(CO3)2(OH)2",
    historicalContext: "Copper-based blue pigments such as azurite were widely used before modern synthetic blues.",
    originProduction: "Naturally occurring copper carbonate mineral.",
    whyColor: "Copper compounds absorb portions of the visible spectrum and are perceived as blue.",
    chemicalStructure: {
      modelName: "Azurite",
      atoms: [{ element: "Cu" }, { element: "C" }, { element: "O" }]
    }
  },
  red: {
    id: "lake_red",
    type: "material",
    color: "#FF0000",
    image: "assets/materials/lake_red_Titian_ff0000.jpg",
    name: "Madder Lake (Lake Red)",
    commonName: "Alizarin",
    formula: "C14H8O4",
    historicalContext: "Identified in the flowers and pink background of Benette's paintings. Synthetic alizarin largely replaced the natural dye after 1871.",
    originProduction: "Extracted from dried, powdered roots or synthesized as alizarin.",
    whyColor: "Alizarin selectively absorbs light, creating the characteristic red hue of the lake pigment.",
    chemicalStructure: {
      modelName: "Alizarin",
      atoms: [{ element: "C" }, { element: "H" }, { element: "O" }]
    }
  },
  signature: {
    id: "artist_signature",
    type: "artist",
    color: "#FF00FF",
    image: "assets/materials/Benette_Casaretto_Motta_assinatura_da_artista_TEMP_ff00ff.png",
    name: "Assinatura da Artista",
    commonName: "Benette Casaretto Motta",
    historicalContext: "Benette participou da primeira turma da Escola de Belas Artes D. Carmen Trápaga Simões (EBA) de Pelotas, onde foi aluna de Aldo Locatelli, Angelo Guido e Leopoldo Gotuzzo.",
    originProduction: "Região de anotação e identificação da autoria da obra.",
    whyColor: "The highlight color identifies the signature region without implying a chemical material.",
  },
  white: {
    id: "white_color",
    type: "material",
    color: "#FFFFFF",
    image: "assets/materials/placeholder_white_pigment_ffffff.jpg",
    name: "White Pigment",
    commonName: "Basic Lead Carbonate",
    formula: "PbCO3",
    historicalContext: "Lead carbonate whites were important historical painting pigments.",
    originProduction: "Historically manufactured as a lead carbonate pigment.",
    whyColor: "Lead carbonate scatters visible light strongly, producing an opaque white appearance.",
    chemicalStructure: {
      modelName: "Lead White",
      atoms: [{ element: "Pb" }, { element: "C" }, { element: "O" }]
    }
  },
  yellow: {
    id: "cadmium_yellow",
    type: "material",
    color: "#FFFF00",
    image: "assets/materials/Cadmiumgelb-_Pigment_ffff00.jpg",
    name: "Cadmium Yellow",
    commonName: "Cadmium Sulfide",
    formula: "CdS",
    historicalContext: "Identified in the yellow petals of Benette's painting 'Flores'.",
    originProduction: "Synthetic pigment; occurs rarely in nature as the mineral greenockite.",
    whyColor: "Cadmium sulfide absorbs blue-violet light and reflects the yellow portion of the spectrum.",
    chemicalStructure: {
      modelName: "Cadmium Sulfide",
      atoms: [{ element: "Cd" }, { element: "S" }]
    }
  }
};
