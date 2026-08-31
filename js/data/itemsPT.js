const ARTWORK_ITEMS = {
    black: {
        id: "carbon_black",
        type: "material",
        color: "#000000",
        image: "assets/materials/Carbon_black_000000.jpg",
        name: "Negro de Carbono",
        commonName: "Negro de Carbono",
        formula: "[data not found]",
        historicalContext: "O negro de carbono é listado entre os pigmentos inorgânicos comumente usados por artistas.",
        originProduction: "[data not found]",
        whyColor: "[data not found]",
        chemicalStructure: {
            modelName: "[data not found]",
            atoms: []
        }
    },

    blue: {
        id: "ultramarine",
        type: "material",
        color: "#0000FF",
        image: "assets/materials/placeholder_blue_pigment_0000ff.jpg",
        name: "Ultramar",
        commonName: "Lápis-lazúli / Ultramar",
        formula: "[data not found]",
        historicalContext: "Uma forma sintética de lápis-lazúli foi obtida no século XIX e recebeu o nome de ultramar.",
        originProduction: "[data not found]",
        whyColor: "[data not found]",
        chemicalStructure: {
            modelName: "[data not found]",
            atoms: []
        }
    },

    cinnabar: {
        id: "cinnabar_hgs",
        type: "material",
        color: "#FF0000",
        image: "assets/materials/lake_red_Titian_ff0000.jpg",
        name: "Cinábrio",
        commonName: "Sulfeto de Mercúrio",
        formula: "HgS",
        historicalContext: "O cinábrio (HgS) é um pigmento vermelho.",
        originProduction: "[data not found]",
        whyColor: "O cinábrio (HgS) é dado como exemplo de um pigmento semicondutor colorido. Em semicondutores, os elétrons podem absorver energia e passar da banda de valência para a banda de condução.",
        chemicalStructure: {
            modelName: "Sulfeto de Mercúrio",
            atoms: [
                { element: "Hg" },
                { element: "S" }
            ]
        }
    },

    cadmium_red: {
        id: "cadmium_sulfoselenide",
        type: "material",
        color: "#FF0000",
        image: "assets/materials/lake_red_Titian_ff0000.jpg",
        name: "Vermelho de Cádmio",
        commonName: "Sulfoseleneto de Cádmio",
        formula: "[data not found]",
        historicalContext: "Os pigmentos de cádmio podem variar do amarelo pálido ao vermelho. A adição de selênio à síntese do pigmento de cádmio foi usada para intensificar o tom vermelho, produzindo o sulfoseleneto de cádmio.",
        originProduction: "O selênio foi incorporado à síntese do pigmento de cádmio para intensificar o tom vermelho, produzindo o sulfoseleneto de cádmio.",
        whyColor: "A cor do vermelho de cádmio está relacionada à sua composição e ao arranjo dos átomos ou à estrutura cristalina do material.",
        chemicalStructure: {
            modelName: "[data not found]",
            atoms: []
        }
    },

    signature: {
        id: "benette_casaretto_signature",
        type: "artist",
        color: "#FF00FF",
        image: "assets/materials/Benette_Casaretto_Motta_assinatura_da_artista_TEMP_ff00ff.png",
        name: "Benette Casaretto",
        historicalContext: "Benedicta Bianchi Casaretto, conhecida como Benette Casaretto, nasceu em Pelotas, Brasil, em 1925. Estudou desenho desde a infância e fez parte da primeira turma da Escola de Belas Artes de Pelotas em 1949. Em 1982, recebeu a distinção Mérito Zona Sul por sua contribuição à arte regional. Em 2022, durante estudos de conservação e restauração de pinturas no Palácio Piratini, foi encontrada uma obra registrada como de autoria desconhecida que trazia a assinatura \"BENETTE 63\". A investigação indicou que Benette era, naquele momento, a única artista mulher representada no acervo do Palácio Piratini. Sua história também suscita questionamentos sobre a visibilidade e o apagamento de mulheres artistas.",
        originProduction: "Ela produziu flores, naturezas-mortas, paisagens, retratos, figuras religiosas, dançarinas, palhaços e representações de mulheres. Utilizou diferentes suportes e técnicas, incluindo telas de tecido, folhas de Eucatex, técnicas pictóricas variadas e combinações de cores."
    },

    zinc_oxide: {
        id: "zinc_oxide",
        type: "material",
        color: "#FFFFFF",
        image: "assets/materials/placeholder_white_pigment_ffffff.jpg",
        name: "Óxido de Zinco",
        commonName: "Óxido de Zinco",
        formula: "ZnO",
        historicalContext: "O óxido de zinco é listado entre os pigmentos inorgânicos comumente usados por artistas.",
        originProduction: "[data not found]",
        whyColor: "[data not found]",
        chemicalStructure: {
            modelName: "[data not found]",
            atoms: []
        }
    },

    titanium_dioxide: {
        id: "titanium_dioxide",
        type: "material",
        color: "#FFFFFF",
        image: "assets/materials/placeholder_white_pigment_ffffff.jpg",
        name: "Dióxido de Titânio",
        commonName: "Dióxido de Titânio",
        formula: "TiO₂",
        historicalContext: "O dióxido de titânio é mencionado como um material que atualmente está substituindo o óxido de zinco para a coloração branca.",
        originProduction: "[data not found]",
        whyColor: "[data not found]",
        chemicalStructure: {
            modelName: "[data not found]",
            atoms: []
        }
    },

    cadmium_yellow: {
        id: "cadmium_sulfide",
        type: "material",
        color: "#FFFF00",
        image: "assets/materials/Cadmiumgelb-_Pigment_ffff00.jpg",
        name: "Amarelo de Cádmio",
        commonName: "Sulfeto de Cádmio",
        formula: "CdS",
        historicalContext: "O amarelo de cádmio é um pigmento sintético de sulfeto de cádmio cuja síntese data do século XIX. Gay-Lussac descreveu sua síntese em 1818, enquanto a comercialização ocorreu em meados da década de 1840. Em 1817, o amarelo de cádmio foi introduzido como alternativa ao amarelo de Nápoles. Foi amplamente usado por artistas como Van Gogh, Matisse, Munch e Ensor, e ainda é comercialmente usado hoje.",
        originProduction: "O cádmio ocorre principalmente associado a minerais de zinco. Durante o processamento dos minérios de zinco, o cádmio é separado e recuperado como subproduto. Em seguida, pode ser usado na preparação do sulfeto de cádmio (CdS). O CdS natural pode ocorrer como greenockita e hawleyita. Durante a produção de pigmentos de cádmio, o zinco foi incorporado para clarear a cor, o selênio para intensificar os tons vermelhos, e uma receita de 1920 usava sulfato de bário para obter um tom mais claro.",
        whyColor: "O sulfeto de cádmio é um semicondutor. Quando a luz atinge o pigmento, parte de sua energia é absorvida pelos elétrons. Isso pode envolver transições da banda de valência para a banda de condução. As cores que não são absorvidas chegam aos olhos e produzem a percepção de amarelo. A cor é descrita como amarelo-alaranjada, quente e brilhante.",
        chemicalStructure: {
            modelName: "Sulfeto de Cádmio",
            atoms: [
                { element: "Cd" },
                { element: "S" }
            ]
        },

        degradation: "O amarelo de cádmio pode se degradar pela exposição à luz, à umidade e à poluição atmosférica. Os efeitos documentados incluem esfarelamento, desbotamento, descamação e delaminação. A degradação também pode produzir compostos esbranquiçados, incluindo carbonato de cádmio, sulfato de cádmio e oxalato de cádmio."
    },

    yellow_ochre: {
        id: "yellow_ochre",
        type: "material",
        color: "#FFFF00",
        image: "assets/materials/Cadmiumgelb-_Pigment_ffff00.jpg",
        name: "Ocre Amarelo",
        commonName: "Óxido de Ferro Hidratado",
        formula: "[data not found]",
        historicalContext: "O ocre amarelo é descrito como óxido de ferro hidratado e é listado entre os pigmentos inorgânicos usados por artistas. Ele aparece em pinturas rupestres.",
        originProduction: "[data not found]",
        whyColor: "[data not found]",
        chemicalStructure: {
            modelName: "[data not found]",
            atoms: []
        }
    }
};
