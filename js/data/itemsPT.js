const ARTWORK_ITEMS = {
    black: {
        id: "bone_black",
        type: "material",
        color: "#000000",
        image: "assets/materials/Bone_Black.jpg",
        name: "Negro de Osso",
        commonName: "Negro de Osso / Negro de Marfim",
        formula: "[non_filled]",
            historicalContext: "O Negro de Osso é um pigmento preto tradicional produzido pela carbonização de ossos de animais. O Negro de Marfim originalmente se referia a um pigmento produzido pela carbonização do marfim. Com o tempo, os nomes passaram a ser usados de forma semelhante em diferentes contextos comerciais e artísticos.",
            originProduction: "O Negro de Osso é produzido pelo aquecimento de ossos de animais com acesso limitado ao oxigênio. Parte da matéria orgânica é transformada em uma fase rica em carbono, enquanto grande parte da porção mineral permanece no material sólido.",
            whyColor: "A aparência preta do Negro de Osso está principalmente relacionada à sua fase carbonácea. A fase rica em carbono absorve grande parte da luz visível, de modo que pouca luz retorna aos olhos.",
            chemicalStructure: {
                modelName: "[non_filled]",
                atoms: []
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
        name: "Laca Vermelha",
        commonName: "Laca Vermelha",
        formula: "[non_filled]",
            historicalContext: "As lacas vermelhas são uma família de pigmentos produzidos a partir de corantes associados a um substrato insolúvel ou pouco solúvel. Historicamente, os corantes podiam vir de plantas ou insetos. A partir do século XIX, corantes sintéticos como a alizarina também passaram a ser usados.",
            originProduction: "Uma laca vermelha é produzida pela associação ou precipitação de um corante sobre um substrato sólido, geralmente inorgânico. Substratos históricos podiam incluir alumina hidratada, sulfato de bário, giz, argila, gesso ou óxido de zinco. A análise da obra identificou um material compatível com laca vermelha, mas não determinou o corante específico presente.",
            whyColor: "[non_filled]",
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
        commonName: "Branco de Cal",
        formula: "CaCO₃",
            historicalContext: "O carbonato de cálcio é um material pigmentário branco inorgânico. As formas históricas discutidas na referência incluem calcita, giz, giz precipitado, branco de cal, branco de concha e coral. O giz foi uma fonte histórica importante.",
            originProduction: "O carbonato de cálcio usado como pigmento branco pode vir de materiais naturais ricos em CaCO₃, incluindo giz, calcita, calcário, mármore, conchas de ostra, corais e ovos de aves.",
            whyColor: "A aparência branca do carbonato de cálcio como pigmento está associada ao forte espalhamento da luz visível por suas partículas e às suas propriedades ópticas.",
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
        color: "#FFFF00",
        image: "assets/materials/Cadmium_Yellow.jpg",
        name: "Amarelo de Cádmio",
        commonName: "Sulfeto de Cádmio",
        formula: "CdS",
            historicalContext: "O amarelo de cádmio é um pigmento sintético de sulfeto de cádmio. Sua síntese remonta ao século XIX. Gay-Lussac descreveu sua síntese em 1818, enquanto a comercialização ocorreu em meados da década de 1840. Tornou-se amplamente usado por artistas e ainda é comercializado.",
            originProduction: "O cádmio ocorre principalmente associado a minerais de zinco. Durante o processamento de minérios de zinco, o cádmio é separado e recuperado como subproduto e pode então ser usado na preparação de sulfeto de cádmio (CdS). A síntese dos pigmentos de cádmio foi posteriormente modificada com zinco, selênio e sulfato de bário para obter diferentes tonalidades.",
            whyColor: "O sulfeto de cádmio é um semicondutor. Quando a luz atinge o pigmento, parte de sua energia é absorvida pelos elétrons. Isso pode envolver transições da banda de valência para a banda de condução. As cores que não são absorvidas chegam aos olhos e produzem a percepção do amarelo.",
            chemicalStructure: {
                modelName: "cadmium_sulfide",
                atoms: [
                    { element: "Cd" },
                    { element: "S" }
                ]
            }
    }
};
