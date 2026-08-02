const PIGMENTS = {
  black: {
    id: "bone_black",
    color: "#000000",
    image: "assets/materials/Carbon_black_000000.jpg",
    name: "Bone Black",
    commonName: "Bone Black",
    formula: "C + Ca5(OH)(PO4)3",
    historicalContext: "Identified in the black base of Benette Casaretto Motta's painting 'Anjo Adonay'. Historically known as Ivory Black.",
    originProduction: "Produced artificially by carbonizing animal bones in closed vessels.",
    molecule: {
      modelName: "Carbon / Hydroxyapatite",
      atoms: [{ element: "C" }]
    }
  },
  blue: {
    id: "blue_pigment",
    color: "#0000FF",
    image: "assets/materials/placeholder_blue_pigment_0000ff.jpg",
    name: "Blue Pigment",
    commonName: "Azurite",
    formula: "Cu3(CO3)2(OH)2",
    historicalContext: "Copper-based blue pigments such as azurite were widely used before modern synthetic blues.",
    originProduction: "Naturally occurring copper carbonate mineral.",
    molecule: {
      modelName: "Azurite",
      atoms: [{ element: "Cu" }, { element: "C" }, { element: "O" }]
    }
  },
  red: {
    id: "lake_red",
    color: "#FF0000",
    image: "assets/materials/lake_red_Titian_ff0000.jpg",
    name: "Madder Lake (Lake Red)",
    commonName: "Alizarin",
    formula: "C14H8O4",
    historicalContext: "Identified in the flowers and pink background of Benette's paintings. Synthetic alizarin largely replaced the natural dye after 1871.",
    originProduction: "Extracted from dried, powdered roots or synthesized as alizarin.",
    molecule: {
      modelName: "Alizarin",
      atoms: [{ element: "C" }, { element: "H" }, { element: "O" }]
    }
  },
  signature: {
    id: "artist_signature",
    color: "#FF00FF",
    image: "assets/materials/Benette_Casaretto_Motta_assinatura_da_artista_TEMP_ff00ff.png",
    name: "Assinatura da Artista",
    commonName: "Benette Casaretto Motta",
    formula: "Signature",
    historicalContext: "Benette participou da primeira turma da Escola de Belas Artes D. Carmen Trápaga Simões (EBA) de Pelotas, onde foi aluna de Aldo Locatelli, Angelo Guido e Leopoldo Gotuzzo.",
    originProduction: "Região de anotação e identificação da autoria da obra.",
    molecule: {
      modelName: "Artist Signature",
      atoms: []
    }
  },
  white: {
    id: "white_pigment",
    color: "#FFFFFF",
    image: "assets/materials/placeholder_white_pigment_ffffff.jpg",
    name: "White Pigment",
    commonName: "Basic Lead Carbonate",
    formula: "PbCO3",
    historicalContext: "Lead carbonate whites were important historical painting pigments.",
    originProduction: "Historically manufactured as a lead carbonate pigment.",
    molecule: {
      modelName: "Lead White",
      atoms: [{ element: "Pb" }, { element: "C" }, { element: "O" }]
    }
  },
  yellow: {
    id: "cadmium_yellow",
    color: "#FFFF00",
    image: "assets/materials/Cadmiumgelb-_Pigment_ffff00.jpg",
    name: "Cadmium Yellow",
    commonName: "Cadmium Sulfide",
    formula: "CdS",
    historicalContext: "Identified in the yellow petals of Benette's painting 'Flores'.",
    originProduction: "Synthetic pigment; occurs rarely in nature as the mineral greenockite.",
    molecule: {
      modelName: "Cadmium Sulfide",
      atoms: [{ element: "Cd" }, { element: "S" }]
    }
  }
};
