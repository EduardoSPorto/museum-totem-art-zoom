const PIGMENTS = {
  black: {
    key: "black",
    id: "bone_black",
    name: "Bone Black (Carbon Black)",
    commonName: "Bone Black",
    formula: "C + Ca5(OH)(PO4)3",
      color: "#000000",
      image: "assets/materials/Carbon_black_000000.jpg",
      imageAlt: "Bone black pigment",
      description: "A stable blue-black pigment produced by charring animal bones, composed of carbon and calcium hydroxyapatite.",
      whyRed: "Carbon absorbs most visible wavelengths because its structure converts incoming light into heat instead of reflecting it.",
      chemistry: {
        elements: "Carbon (C), Calcium (Ca), Phosphorus (P), Oxygen (O)",
        structure: "Graphitic carbon particles dispersed in a hydroxyapatite matrix",
        lightAbsorption: "Broad visible-spectrum absorption"
      },
      historical: "Identified in the black base of Benette Casaretto Motta's painting 'Anjo Adonay'. Historically known as Ivory Black.",
      properties: [
        "Excellent lightfastness (ASTM I)",
        "Denser than pure carbon black",
        "Good working quality for oil paints"
      ],
      occurrence: "Produced artificially by carbonizing animal bones in closed vessels.",
      molecule: {
        name: "Carbon / Hydroxyapatite",
        formula: "C / Ca5(OH)(PO4)3",
          molecularWeight: 12.01, // Weight for Carbon. Hydroxyapatite unverified.
          atoms: [
            { element: "C" }
          ],
          bonds: [],
          structure: "Graphitic fragment representative of the carbon content"
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
    name: "Madder Lake (Lake Red)",
    commonName: "Alizarin",
    formula: "C14H8O4",
      color: "#FF0000",
      image: "assets/materials/lake_red_Titian_ff0000.jpg",
      imageAlt: "Madder lake pigment",
      description: "A natural red dye extracted from the roots of the madder plant (Rubia tinctorum) and fixed onto an inorganic substrate.",
      whyRed: "The conjugated organic structure of alizarin reflects wavelengths in the red portion of the spectrum.",
      chemistry: {
        elements: "Carbon (C), Hydrogen (H), Oxygen (O)",
        structure: "Anthraquinone derivative fixed on an alumina or calcium substrate",
        lightAbsorption: "Conjugated pi-electron system"
      },
      historical: "Identified in the flowers and pink background of Benette's paintings. Synthetic alizarin largely replaced the natural dye after 1871.",
      properties: [
        "Transparent to semi-transparent",
        "Produces a pale violet fluorescence under UV light",
        "Poor lightfastness compared to synthetic versions"
      ],
      occurrence: "Extracted from dried, powdered roots or synthesized as alizarin.",
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
          structure: "Main coloring agent of madder lake"
      }
  },
  signature: {
    key: "signature",
    id: "artist_signature",
    name: "Assinatura da Artista",
    commonName: "Benette Casaretto Motta",
    formula: "Signature",
      color: "#FF00FF",
      image: "assets/materials/Benette_Casaretto_Motta_assinatura_da_artista_TEMP_ff00ff.png",
      imageAlt: "Assinatura da artista Benette",
      description: "Assinatura de Benedicta Bianchi Casaretto (1925), conhecida como Benette, única artista mulher com obra no acervo do Palácio Piratini.",
      whyRed: "This mask color identifies the artist signature area rather than a pigment material.",
      chemistry: {
        area: "Artist signature",
        maskColor: "#FF00FF"
      },
      historical: "Benette participou da primeira turma da Escola de Belas Artes D. Carmen Trápaga Simões (EBA) de Pelotas, onde foi aluna de Aldo Locatelli, Angelo Guido e Leopoldo Gotuzzo.",
      properties: [
        "Assinatura localizada no anverso das pinturas, como 'BENETTE 63'",
        "Temas artísticos incluem flores, palhaços, bailarinas, paisagens e retratos",
        "Obras executadas em suportes de chapa de fibra de madeira (Eucatex) ou telas de tecido",
        "Uso de tinta a óleo com pigmentos como lake red, negro de carbono e amarelo de cádmio, utilizando óleo de linhaça como aglutinante"
      ],
      occurrence: "Região de anotação e identificação da autoria da obra.",
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
      description: "A permanent, bright yellow pigment composed of cadmium sulfide, first synthesized in 1817.",
      whyRed: "Cadmium sulfide absorbs shorter blue-violet wavelengths and reflects yellow light.",
      chemistry: {
        elements: "Cadmium (Cd), Sulfur (S)",
        structure: "Cubic or hexagonal crystalline structure",
        bandGap: "Visible-light semiconductor band gap"
      },
      historical: "Identified in the yellow petals of Benette's painting 'Flores'.",
      properties: [
        "Highly saturated and opaque",
        "Highly toxic if inhaled",
        "Incompatible with lead or copper-containing pigments"
      ],
      occurrence: "Synthetic pigment; occurs rarely in nature as the mineral greenockite.",
      molecule: {
        name: "Cadmium Sulfide",
        formula: "CdS",
          molecularWeight: 144.48,
          atoms: [
            { element: "Cd" },
            { element: "S" }
          ],
          bonds: [],
          structure: "Cadmium sulfide crystal model"
      }
  }
};
