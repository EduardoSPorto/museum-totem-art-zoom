const ARTWORK_ITEMS = {
    black: {
        id: "carbon_black",
        type: "material",
        color: "#000000",
        image: "assets/materials/Carbon_black_000000.jpg",
        name: "Carbon Black",
        commonName: "Carbon Black",
        formula: "[data not found]",
        historicalContext: "Carbon black is listed among inorganic pigments commonly used by artists.",
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
        name: "Ultramarine",
        commonName: "Lapis Lazuli / Ultramarine",
        formula: "[data not found]",
        historicalContext: "A synthetic form of lapis lazuli was obtained in the 19th century and named ultramarine.",
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
        name: "Cinnabar",
        commonName: "Mercury Sulfide",
        formula: "HgS",
        historicalContext: "Cinnabar (HgS) is a red pigment.",
        originProduction: "[data not found]",
        whyColor: "Cinnabar (HgS) is given as an example of a colored semiconductor pigment. In semiconductors, electrons can absorb energy and move from the valence band to the conduction band.",
        chemicalStructure: {
            modelName: "Mercury Sulfide",
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
        name: "Cadmium Red",
        commonName: "Cadmium Sulfoselenide",
        formula: "[data not found]",
        historicalContext: "Cadmium pigments can range from pale yellow to red. The addition of selenium to cadmium pigment synthesis was used to intensify the red tone, producing cadmium sulfoselenide.",
        originProduction: "Selenium was incorporated into cadmium pigment synthesis to intensify the red tone, producing cadmium sulfoselenide.",
        whyColor: "The color of cadmium red is related to its composition and to the arrangement of the atoms or crystal structure of the material.",
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
        historicalContext: "Benedicta Bianchi Casaretto, known as Benette Casaretto, was born in Pelotas, Brazil, in 1925. She studied drawing from childhood and was part of the first class of the School of Fine Arts of Pelotas in 1949. In 1982, she received the Mérito Zona Sul distinction for her contribution to regional art. In 2022, during conservation and restoration studies of paintings at the Piratini Palace, a work registered as having unknown authorship was found to bear the signature \"BENETTE 63\". The investigation indicated that Benette was, at that time, the only female artist represented in the Piratini Palace collection. Her history also introduces questions about the visibility and erasure of women artists.",
        originProduction: "She produced flowers, still lifes, landscapes, portraits, religious figures, dancers, clowns, and representations of women. She used different supports and techniques, including fabric canvases, Eucatex sheets, varied pictorial techniques, and combinations of colors."
    },

    zinc_oxide: {
        id: "zinc_oxide",
        type: "material",
        color: "#FFFFFF",
        image: "assets/materials/placeholder_white_pigment_ffffff.jpg",
        name: "Zinc Oxide",
        commonName: "Zinc Oxide",
        formula: "ZnO",
        historicalContext: "Zinc oxide is listed among inorganic pigments commonly used by artists.",
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
        name: "Titanium Dioxide",
        commonName: "Titanium Dioxide",
        formula: "TiO₂",
        historicalContext: "Titanium dioxide is mentioned as a material that is currently replacing zinc oxide for white coloration.",
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
        name: "Cadmium Yellow",
        commonName: "Cadmium Sulfide",
        formula: "CdS",
        historicalContext: "Cadmium yellow is a synthetic cadmium sulfide pigment whose synthesis dates to the 19th century. Gay-Lussac described its synthesis in 1818, while commercialization occurred in the mid-1840s. In 1817, cadmium yellow was introduced as an alternative to Naples yellow. It was extensively used by artists including Van Gogh, Matisse, Munch, and Ensor, and it is still commercially used today.",
        originProduction: "Cadmium occurs mainly associated with zinc minerals. During the processing of zinc ores, cadmium is separated and recovered as a byproduct. It can then be used in the preparation of cadmium sulfide (CdS). Natural CdS can occur as greenockite and hawleyite. During the production of cadmium pigments, zinc was incorporated to lighten the color, selenium to intensify red tones, and a 1920 recipe used barium sulfate to obtain a lighter shade.",
        whyColor: "Cadmium sulfide is a semiconductor. When light reaches the pigment, part of its energy is absorbed by electrons. This can involve transitions from the valence band to the conduction band. The colors that are not absorbed reach the eyes and produce the perception of yellow. The color is described as orange-yellow, warm, and bright.",
        chemicalStructure: {
            modelName: "Cadmium Sulfide",
            atoms: [
                { element: "Cd" },
                { element: "S" }
            ]
        },

        degradation: "Cadmium yellow can degrade through exposure to light, humidity, and atmospheric pollution. Documented effects include chalking, fading, flaking, and peeling. Degradation can also produce whitish compounds including cadmium carbonate, cadmium sulfate, and cadmium oxalate."
    },

    yellow_ochre: {
        id: "yellow_ochre",
        type: "material",
        color: "#FFFF00",
        image: "assets/materials/Cadmiumgelb-_Pigment_ffff00.jpg",
        name: "Yellow Ochre",
        commonName: "Hydrated Iron Oxide",
        formula: "[data not found]",
        historicalContext: "Yellow ochre is described as hydrated iron oxide and is listed among inorganic pigments used by artists. It appears in cave paintings.",
        originProduction: "[data not found]",
        whyColor: "[data not found]",
        chemicalStructure: {
            modelName: "[data not found]",
            atoms: []
        }
    }
};