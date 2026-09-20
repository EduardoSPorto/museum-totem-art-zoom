const ARTWORK_ITEMS = {
    black: {
        id: "bone_black",
        type: "material",
        color: "#000000",
        image: "assets/materials/Bone_Black.jpg",
        name: "Bone Black",
        commonName: "Bone Black / Ivory Black",
        formula: "[non_filled]",
            historicalContext: "Bone Black is a traditional black pigment produced by the carbonization of animal bones. Ivory Black originally referred to a pigment produced by the carbonization of ivory. Over time, the names came to be used similarly in different commercial and artistic contexts.",
            originProduction: "Bone Black is produced by heating animal bones with limited access to oxygen. Part of the organic matter is transformed into a carbon-rich phase while much of the mineral portion remains in the solid material.",
            whyColor: "The black appearance of Bone Black is mainly related to its carbonaceous phase. The carbon-rich phase absorbs a large part of the visible light, so little light returns to the eyes.",
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
        name: "Blue Pigment",
        commonName: "Blue Pigment",
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
        name: "Red Lake",
        commonName: "Red Lake",
        formula: "[non_filled]",
            historicalContext: "Red Lakes are a family of pigments produced from dyes associated with an insoluble or sparingly soluble substrate. Historically, the dyes could come from plants or insects. From the 19th century onward, synthetic dyes such as alizarin were also used.",
            originProduction: "A Red Lake is produced by associating or precipitating a dye onto a solid, generally inorganic substrate. Historical substrates could include hydrated alumina, barium sulfate, chalk, clay, gypsum, or zinc oxide. The analysis of the work identified a material compatible with Red Lake, but did not determine the specific dye present.",
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
        historicalContext: "Benedicta Bianchi Casaretto, known as Benette Casaretto, was born in Pelotas, Brazil, in 1925. She studied drawing from childhood and was part of the first class of the School of Fine Arts of Pelotas in 1949. In 1982, she received the Mérito Zona Sul distinction for her contribution to regional art. In 2022, during conservation and restoration studies of paintings at the Piratini Palace, a work registered as having unknown authorship was found to bear the signature \"BENETTE 63\". The investigation indicated that Benette was, at that time, the only female artist represented in the Piratini Palace collection. Her history also introduces questions about the visibility and erasure of women artists.",
        originProduction: "She produced flowers, still lifes, landscapes, portraits, religious figures, dancers, clowns, and representations of women. She used different supports and techniques, including fabric canvases, Eucatex sheets, varied pictorial techniques, and combinations of colors."
    },

    white: {
        id: "calcium_carbonate",
        type: "material",
        color: "#FFFFFF",
        image: "assets/materials/Calcium_Carbonate.jpg",
        name: "Calcium Carbonate",
        commonName: "White of Lime",
        formula: "CaCO₃",
            historicalContext: "Calcium carbonate is an inorganic white pigment material. Historical forms discussed in the reference include calcite, chalk, precipitated chalk, white of lime, shell white, and coral. Chalk was an important historical source.",
            originProduction: "Calcium carbonate used as a white pigment can come from natural materials rich in CaCO₃, including chalk, calcite, limestone, marble, oyster shells, corals, and bird eggshells.",
            whyColor: "The white appearance of calcium carbonate as a pigment is associated with strong scattering of visible light by its particles and with their optical properties.",
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
        name: "Cadmium Yellow",
        commonName: "Cadmium Sulfide",
        formula: "CdS",
            historicalContext: "Cadmium yellow is a synthetic cadmium sulfide pigment. Its synthesis dates to the 19th century. Gay-Lussac described its synthesis in 1818, while commercialization occurred in the mid-1840s. It became widely used by artists and is still commercially used.",
            originProduction: "Cadmium occurs mainly associated with zinc minerals. During the processing of zinc ores, cadmium is separated and recovered as a byproduct and can then be used in the preparation of cadmium sulfide (CdS). The synthesis of cadmium pigments was later modified with zinc, selenium, and barium sulfate to obtain different tones.",
            whyColor: "Cadmium sulfide is a semiconductor. When light reaches the pigment, part of its energy is absorbed by electrons. This can involve transitions from the valence band to the conduction band. The colors that are not absorbed reach the eyes and produce the perception of yellow.",
            chemicalStructure: {
                modelName: "cadmium_sulfide",
                atoms: [
                    { element: "Cd" },
                    { element: "S" }
                ]
            }
    }
};
