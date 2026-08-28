const ARTWORK_ITEMS = {
    black: {
        id: "bone_black",
        type: "material",
        color: "#000000",
        image: "assets/materials/Carbon_black_000000.jpg",
        name: "Carbon Black",
        commonName: "[not informed]",
        formula: "[not informed]",
        historicalContext: "Among the inorganic pigments most used today by artists, we can find carbon black.",
        originProduction: "[not informed]",
        whyColor: "[not informed]",
        chemicalStructure: {
            modelName: "[not informed]",
            atoms: []
        }
    },
    blue: {
        id: "blue_color",
        type: "material",
        color: "#0000FF",
        image: "assets/materials/placeholder_blue_pigment_0000ff.jpg",
        name: "Lapis Lazuli / Ultramarine",
        commonName: "Ultramarine",
        formula: "[not informed]",
        historicalContext: "A synthetic form of lapis lazuli was obtained in the 19th century and named ultramarine, which is among the inorganic pigments most used by artists today.",
        originProduction: "A synthetic form of lapis lazuli was obtained in the 19th century and named ultramarine.",
        whyColor: "[not informed]",
        chemicalStructure: {
            modelName: "[not informed]",
            atoms: []
        }
    },
    red: {
        id: "lake_red",
        type: "material",
        color: "#FF0000",
        image: "assets/materials/lake_red_Titian_ff0000.jpg",
        name: "Cadmium Red / Cinnabar",
        commonName: "Cadmium Red / Cinnabar",
        formula: "HgS (Cinnabar) / [not informed] (Cadmium Red)",
        historicalContext: "Cinnabar (HgS) is a historical red compound. Cadmium yellow was also used for the production of orange and red pigments, and is still used today for the same purpose. In the 20th century, the synthesis of cadmium yellow began to incorporate selenium (forming cadmium sulfoselenide) to intensify the red shade, allowing a spectrum of colors known collectively as cadmium pigments.",
        originProduction: "Cadmium red is chemically formed by cadmium sulfoselenide. In the 20th century, selenium was incorporated into the synthesis of cadmium yellow to intensify the red shade.",
        whyColor: "For cadmium red, the color is due to its composition and the arrangement of the atoms of the elements or the crystal structure of the material. Transition metals like cadmium tend to explain the color of materials because their atoms have electrons more susceptible to energy state changes when visible light (wavelength of 380-760 nm) hits the material. For cinnabar, a semiconductor, color occurs through the transition of electrons from the valence band (filled orbitals) to the conduction band (empty orbitals) as they absorb energy.",
        chemicalStructure: {
            modelName: "Cadmium Red / Cinnabar",
            atoms: [
                { element: "Cd" },
                { element: "S" },
                { element: "Se" },
                { element: "Hg" }
            ]
        }
    },
    signature: {
        id: "artist_signature",
        type: "artist",
        color: "#FF00FF",
        image: "assets/materials/Benette_Casaretto_Motta_assinatura_da_artista_TEMP_ff00ff.png",
        name: "Benette Casaretto / Art Conservation",
        historicalContext: "Benedicta Bianchi Casaretto (Benette Casaretto), born in Pelotas/RS in 1925, was a regional artist who studied drawing since childhood and graduated in the first class of the School of Fine Arts of Pelotas in 1949. She received the Mérito Zona Sul distinction in 1982. In 2022, during conservation and restoration studies of paintings at the Piratini Palace, her signature 'BENETTE 63' was identified on a work previously registered as of unknown authorship, revealing her as the only female artist in the collection. Her story prompts reflection on the historical erasure of women artists. In the field of art conservation, a common goal is to slow down the degradation of artworks. Special precautions for artworks containing cadmium yellow include monitoring temperature, humidity, and lighting levels to minimize deterioration. Additionally, restoration techniques and conservation treatments can be employed to protect the painting and preserve its beauty over time. Continuous research in the field of cultural heritage conservation is essential.",
        originProduction: "Benette Casaretto produced flowers, still lifes, landscapes, portraits, religious figures, dancers, clowns, and female representations. She utilized different supports and techniques, such as fabric canvases, Eucatex sheets, varied pictorial techniques, and combinations of colors. In conservation practice, degradation is slowed down by monitoring environmental conditions like temperature, humidity, and lighting levels, and by employing restoration techniques and conservation treatments to protect the painting."
    },
    white: {
        id: "white_color",
        type: "material",
        color: "#FFFFFF",
        image: "assets/materials/placeholder_white_pigment_ffffff.jpg",
        name: "Zinc Oxide / Titanium Dioxide",
        commonName: "[not informed]",
        formula: "ZnO / [not informed]",
        historicalContext: "Zinc oxide (ZnO) is among the most used inorganic pigments by artists today, but it is currently being replaced by titanium oxide (titanium dioxide) for white colorations.",
        originProduction: "[not informed]",
        whyColor: "[not informed]",
        chemicalStructure: {
            modelName: "Zinc Oxide",
            atoms: [
                { element: "Zn" },
                { element: "O" }
            ]
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
        historicalContext: "In 1817, cadmium yellow was introduced as an alternative to Naples yellow (lead antimoniate) used in the 18th century, which was considered toxic. Friedrich Stromeyer is associated with the identification of cadmium in 1817. Gay-Lussac described the synthesis of cadmium sulfide in 1818, although commercialization of the pigments only occurred in the mid-1840s. Cadmium yellow is renowned for its extensive use by Impressionist artists such as Van Gogh, Matisse, Munch, and Ensor. Currently, the pigment is still commercialized and used in paintings.",
        originProduction: "Cadmium occurs mainly associated with zinc minerals and is separated and recovered as a byproduct during zinc ore processing. It is then used in the preparation of cadmium sulfide (CdS). In nature, CdS can be found in the mineral greenockite (hexagonal structure) and hawleyite (cubic structure), which manifest as impurities in zinc ores. In the 20th century, synthesis began to incorporate zinc to lighten the color, and selenium to intensify the red shade. In 1920, a recipe using barium sulfate (BaSO4) was developed to obtain a lighter shade. The CdS compound has different crystal structures, such as greenockite (hexagonal), hawleyite (cubic), zinc blende (cubic), and wurtzite (hexagonal), with a melting temperature close to 1600 °C. The chemical bond between Cd and S has a mixed character, with both ionic and covalent contributions: the predominantly ionic character relates to charge transfer from cadmium to sulfur, and the covalent contribution relates to orbital interactions.",
        whyColor: "CdS is a semiconductor with a band gap of approximately 2.42 eV. When light hits the pigment, electrons absorb energy and transition from the valence band (filled orbitals) to the conduction band (empty orbitals). The unabsorbed colors return to our eyes, producing the perception of yellow (described as warm, bright, and orange-yellow). However, cadmium yellow undergoes degradation due to exposure to light (especially UV and blue light from artificial white LED museum lighting), humidity, and atmospheric pollution. This causes a loss of color intensity through superficial deterioration (such as chalking, flaking, peeling, and fading) and internal chemical reactions with paint binders. The degradation mainly involves the formation of whitish compounds, such as cadmium sulfate (from CdS oxidation), cadmium carbonate (the final product of photodegradation), and cadmium oxalate.",
        chemicalStructure: {
            modelName: "Cadmium Sulfide",
            atoms: [
                { element: "Cd" },
                { element: "S" }
            ]
        }
    }
};
