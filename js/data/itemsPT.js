const ARTWORK_ITEMS = {
  black: {
    id: "bone_black",
    type: "material",
    color: "#000000",
    image: "assets/materials/Carbon_black_000000.jpg",
    name: "Preto de Osso",
    commonName: "Preto de Osso",
    formula: "C + Ca5(OH)(PO4)3",
      historicalContext: "Identificado na base preta da pintura 'Anjo Adonay', de Benette Casaretto Motta. Historicamente conhecido como Preto de Marfim.",
      originProduction: "Produzido artificialmente pela carbonização de ossos de animais em recipientes fechados.",
      whyColor: "O preto de osso, rico em carbono, absorve a maior parte da luz visível, produzindo um tom preto intenso.",
      chemicalStructure: {
        modelName: "Carbono / Hidroxiapatita",
        atoms: [{ element: "C" }]
      }
  },
  blue: {
    id: "blue_color",
    type: "material",
    color: "#0000FF",
    image: "assets/materials/placeholder_blue_pigment_0000ff.jpg",
    name: "Pigmento Azul",
    commonName: "Azurita",
    formula: "Cu3(CO3)2(OH)2",
      historicalContext: "Pigmentos azuis à base de cobre, como a azurita, foram amplamente utilizados antes do surgimento dos azuis sintéticos modernos.",
      originProduction: "Mineral natural composto por carbonato de cobre.",
      whyColor: "Os compostos de cobre absorvem parte do espectro visível e são percebidos como azuis.",
      chemicalStructure: {
        modelName: "Azurita",
        atoms: [{ element: "Cu" }, { element: "C" }, { element: "O" }]
      }
  },
  red: {
    id: "lake_red",
    type: "material",
    color: "#FF0000",
    image: "assets/materials/lake_red_Titian_ff0000.jpg",
    name: "Laca de Garança (Vermelho Laca)",
    commonName: "Alizarina",
    formula: "C14H8O4",
      historicalContext: "Identificada nas flores e no fundo rosado das pinturas de Benette. A alizarina sintética substituiu amplamente o corante natural após 1871.",
      originProduction: "Extraída de raízes secas e pulverizadas ou sintetizada como alizarina.",
      whyColor: "A alizarina absorve seletivamente determinados comprimentos de onda da luz, produzindo o característico tom vermelho do pigmento laca.",
      chemicalStructure: {
        modelName: "Alizarina",
        atoms: [{ element: "C" }, { element: "H" }, { element: "O" }]
      }
  },
  signature: {
    id: "artist_signature",
    type: "artist",
    color: "#FF00FF",
    image: "assets/materials/Benette_Casaretto_Motta_assinatura_da_artista_TEMP_ff00ff.png",
    name: "Benette Casaretto Motta",
    historicalContext: "Benette participou da primeira turma da Escola de Belas Artes D. Carmen Trápaga Simões (EBA) de Pelotas, onde foi aluna de Aldo Locatelli, Angelo Guido e Leopoldo Gotuzzo.",
    originProduction: "Pelotas, Rio Grande do Sul, Brasil",
  },
  white: {
    id: "white_color",
    type: "material",
    color: "#FFFFFF",
    image: "assets/materials/placeholder_white_pigment_ffffff.jpg",
    name: "Pigmento Branco",
    commonName: "Carbonato Básico de Chumbo",
    formula: "PbCO3",
      historicalContext: "Os pigmentos brancos à base de carbonato de chumbo foram importantes na história da pintura.",
      originProduction: "Historicamente produzido como um pigmento de carbonato de chumbo.",
      whyColor: "O carbonato de chumbo dispersa intensamente a luz visível, produzindo uma aparência branca e opaca.",
      chemicalStructure: {
        modelName: "Branco de Chumbo",
        atoms: [{ element: "Pb" }, { element: "C" }, { element: "O" }]
      }
  },
  yellow: {
    id: "cadmium_yellow",
    type: "material",
    color: "#FFFF00",
    image: "assets/materials/Cadmiumgelb-_Pigment_ffff00.jpg",
    name: "Amarelo de Cádmio",
    commonName: "Sulfeto de Cádmio",
    formula: "CdS",
      historicalContext: "Identificado nas pétalas amarelas da pintura 'Flores', de Benette.",
      originProduction: "Pigmento sintético; ocorre raramente na natureza como o mineral greenockita.",
      whyColor: "O sulfeto de cádmio absorve a luz azul-violeta e reflete a porção amarela do espectro.",
      chemicalStructure: {
        modelName: "Sulfeto de Cádmio",
        atoms: [{ element: "Cd" }, { element: "S" }]
      }
  }
};
