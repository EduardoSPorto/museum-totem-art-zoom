const ARTWORK_ITEMS = {
    black: {
        id: "bone_black",
        type: "material",
        color: "#000000",
        image: "assets/materials/Bone_Black.jpg",
        name: "Negro de Osso",
        commonName: "Negro de Osso / Negro de Marfim",
        formula: "C + Ca₁₀(PO₄)₆(OH)₂ + CaCO₃ (Representação Simplificada)",
            historicalContext: "Pigmento negro de origem animal tradicional. O Ivory Black autêntico era obtido da carbonização de marfim, mas com o tempo os nomes tornaram-se sinônimos comerciais para variedades refinadas do Bone Black.",
            originProduction: "Pigmento inorgânico/orgânico de origem animal obtido por carbonização (aquecimento com oxigênio limitado). Tem composição bifásica, sendo cerca de 10% a 20% fase carbonácea (domínios desorganizados de carbono com redes hexagonais semelhantes a fragmentos de grafeno) com o resto sendo fase mineral (composta predominantemente por hidroxiapatita (Ca₁₀(PO₄)₆(OH)₂), acrescida de cerca de 6% de carbonato de cálcio (CaCO₃) e traços de fosfato de magnésio).",
            whyColor: "A cor preta é produzida exclusivamente pela fase carbonácea, que absorve intensamente a luz visível em toda a amplitude do espectro, refletindo pouquíssima luz.",
            chemicalStructure: {
                modelName: "bone_black",
                atoms: [
                    { element: "C" },
                    { element: "Ca" },
                    { element: "P" },
                    { element: "O" }
                ]
            }
    },

    blue: {
        id: "generic_blue",
        type: "material",
        color: "#0000FF",
        image: "assets/materials/generic_blue.jpg",
        name: "Pigmento Azul",
        commonName: "Pigmento Azul",
        formula: "[non_filled]",
            historicalContext: "[non_filled]",
            originProduction: "[non_filled]",
            whyColor: "[non_filled]",
            chemicalStructure: {
                modelName: "[non_filled]",
                atoms: []
            }
    },

    red: {
        id: "red_lake",
        type: "material",
        color: "#FF0000",
        image: "assets/materials/Red_Lake.jpg",
        name: "Red Lake, provável Alizarina",
        commonName: "Red Lake, provável Alizarina",
        formula: "C₁₄H₈O₄ (Fórmula Representativa)",
            historicalContext: "Historicamente, o corante era extraído de insetos e fontes vegetais, como o famoso pau-brasil. A partir da patente da síntese da alizarina em 1868, versões sintéticas do pigmento começaram a surgir no final do século XIX.",
            originProduction: "Pigmento orgânico do tipo laca (lake pigment), formado pela precipitação ou adsorção de um corante orgânico solúvel sobre um substrato inorgânico sólido e insolúvel. O substrato pode conter alumina hidratada, hidróxido de alumínio, sais de alumínio (Al³⁺), giz, gesso, argila, sulfato de bário ou óxido de zinco. A Alizarina (1,2-di-hidroxiantraquinona) pertence à família das antraquinonas, apresentando anéis aromáticos interligados, grupos carbonila e hidroxilas (-OH) que formam complexos com cátions metálicos como o Al(III).",
            whyColor: "Os elétrons conjugados dos anéis da antraquinona e seus complexos metálicos absorvem comprimentos de onda específicos da luz visível, refletindo a faixa do vermelho.",
            chemicalStructure: {
                modelName: "alizarin_representative",
                atoms: [
                    { element: "C" },
                    { element: "H" },
                    { element: "O" }
                ]
            }
    },

    signature: {
        id: "benette_casaretto_signature",
        type: "artist",
        color: "#FF00FF",
        image: "assets/materials/Benette_Casaretto_Motta_assinatura_da_artista_TEMP_ff00ff.png",
        name: "Benette Casaretto",
        historicalContext: "Benedicta Bianchi Casaretto, conhecida como Benette Casaretto, nasceu em Pelotas, Brasil, em 1925. Ela estudou desenho desde a infância e fez parte da primeira turma da Escola de Belas Artes de Pelotas em 1949. Em 1982, recebeu a distinção Mérito Zona Sul por sua contribuição à arte regional. Em 2022, durante estudos de conservação e restauração de pinturas no Palácio Piratini, foi encontrada uma obra registrada como de autoria desconhecida que trazia a assinatura \"BENETTE 63\". A investigação indicou que Benette era, naquele momento, a única artista mulher representada no acervo do Palácio Piratini. Sua história também traz questões sobre a visibilidade e o apagamento de mulheres artistas.",
        originProduction: "Ela produziu flores, naturezas-mortas, paisagens, retratos, figuras religiosas, bailarinas, palhaços e representações de mulheres. Utilizou diferentes suportes e técnicas, incluindo telas de tecido, folhas de Eucatex, variadas técnicas pictóricas e combinações de cores."
    },

    white: {
        id: "calcium_carbonate",
        type: "material",
        color: "#FFFFFF",
        image: "assets/materials/Calcium_Carbonate.jpg",
        name: "Carbonato de Cálcio",
        commonName: "Carbonato de Cálcio",
        formula: "CaCO₃",
            historicalContext: "É considerado provavelmente o pigmento branco mais antigo do mundo, utilizado desde períodos pré-históricos e na antiguidade a partir de fontes minerais como calcário, giz, mármore e fontes biogênicas, tal como conchas de ostras, corais e cascas de ovos. Devido ao seu limitado poder de cobertura em meios oleosos, foi utilizado principalmente na preparação de fundos para pintura e em afrescos.",
            originProduction: "Sal inorgânico (pigmento inorgânico branco), sendo adotada na caracterização do pigmento como sua principal forma mineral a calcita (sistema cristalino trigonal / romboédrico). No cristal de calcita, os cátions Ca²⁺ ocupam posições coordenadas por seis oxigênios (octaedros), enquanto os grupos carbonato (CO₃²⁻) formam arranjos planares com a carga negativa deslocalizada entre os três átomos de oxigênio.",
            whyColor: "Diferente de pigmentos coloridos que absorvem comprimentos de onda específicos, o carbonato de cálcio promove um intenso espalhamento da luz visível. As partículas desviam a luz visível em múltiplas direções sem absorção seletiva, fazendo com que a luz refletida retorne integralmente aos olhos e seja percebida como branca.",
            chemicalStructure: {
                modelName: "calcite",
                atoms: [
                    { element: "Ca" },
                    { element: "C" },
                    { element: "O" }
                ]
            }
    },

    yellow: {
        id: "cadmium_sulfide",
        type: "material",
        color: "#FFF600",
        image: "assets/materials/Cadmium_Yellow.jpg",
        name: "Amarelo de Cádmio",
        commonName: "Sulfeto de Cádmio",
        formula: "CdS",
            historicalContext: "Surgiu no século XIX como uma alternativa vibrante ao \"Amarelo de Nápoles\" devido à toxicidade deste último. O elemento cádmio foi descoberto em 1817 por Friedrich Stromeyer, e a síntese do CdS foi descrita por Gay-Lussac em 1818, sendo comercializado a partir da década de 1840. Tornou-se famoso ao ser amplamente adotado por artistas impressionistas e pós-impressionistas, como Van Gogh, Matisse, Munch e Ensor.",
            originProduction: "Pigmento inorgânico (sal/composto inorgânico semicondutor) de caráter misto (contribuição iônica e covalente), com transferência de carga do Cádmio (Cd²⁺) para o Enxofre (S²⁻). Ocorre na natureza principalmente em duas formas polimórficas cristalinas: a greenockita (estrutura hexagonal / wurtzita) e a hawleyita (estrutura cúbica / blenda de zinco).",
            whyColor: "O CdS é um semicondutor com uma energia de banda proibida de aproximadamente 2,42eV. Quando a luz incide sobre o pigmento, os elétrons absorvem energia e saltam da banda de valência para a banda de condução. Os comprimentos de onda não absorvidos são os da faixa do amarelo ao alaranjado, estes então são refletidos até os nossos olhos.",
            chemicalStructure: {
                modelName: "cadmium_sulfide",
                atoms: [
                    { element: "Cd" },
                    { element: "S" }
                ]
            }
    }
};
