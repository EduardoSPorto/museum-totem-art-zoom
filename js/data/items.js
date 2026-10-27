const ARTWORK_ITEMS = {
    black: {
        id: "bone_black",
        type: "material",
        color: "#000000",
        image: "assets/materials/Bone_Black.jpg",
        name: "Bone Black",
        commonName: "Bone Black / Ivory Black",
        formula: "C + Ca₁₀(PO₄)₆(OH)₂ + CaCO₃ (Simplified Representation)",
            historicalContext: "Traditional black pigment of animal origin. Authentic Ivory Black was obtained from the carbonization of ivory, but over time the names became commercial synonyms for refined varieties of Bone Black.",
            structure: "Inorganic/organic pigment of animal origin obtained by carbonization (heating with limited oxygen). It has a biphasic composition, consisting of about 10% to 20% carbonaceous phase (disorganized carbon domains with hexagonal networks similar to graphene fragments) with the rest being the mineral phase (composed predominantly of hydroxyapatite (Ca₁₀(PO₄)₆(OH)₂), plus about 6% calcium carbonate (CaCO₃) and traces of magnesium phosphate).",
            whyColor: "The black color is produced exclusively by the carbonaceous phase, which intensely absorbs visible light across the entire amplitude of the spectrum, reflecting very little light.",
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
        id: "prussian_blue",
        type: "material",
        color: "#0000FF",
        image: "assets/materials/generic_blue.jpg",
        name: "Prussian Blue",
        commonName: "Prussian Blue (PB27)",
        formula: "Fe(III)₄[Fe(II)(CN)₆]₃ · xH₂O",
            historicalContext: "Inorganic blue pigment with significant historical use in oil paintings and in green paint mixtures[cite: 1]. It is a chronologically plausible candidate for the blue and green regions of Benette Casaretto Motta's artworks (such as 'Anjo Adonay' and 'Untitled (Flowers)'), although its presence has not yet been confirmed by chemical analysis in these specific regions[cite: 1].",
            structure: "Inorganic pigment consisting of a three-dimensional coordination network[cite: 1]. The structure is formed by iron centers in different oxidation states connected by cyanide ligands, featuring Fe(II)-C=N-Fe(III) segments[cite: 1].",
            whyColor: "The characteristic intense blue color results from an intervalence charge transfer process between the Fe(II) and Fe(III) metal centers[cite: 1].",
            chemicalStructure: {
                modelName: "prussian_blue",
                atoms: [
                    { element: "Fe" },
                    { element: "C" },
                    { element: "N" },
                    { element: "H" },
                    { element: "O" }
                ]
            }
    },

    red: {
        id: "red_lake",
        type: "material",
        color: "#FF0000",
        image: "assets/materials/Red_Lake.jpg",
        name: "Red Lake, probable Alizarin",
        commonName: "Red Lake, probable Alizarin",
        formula: "C₁₄H₈O₄ (Representative Formula)",
            historicalContext: "Historically, the dye was extracted from insects and plant sources, such as the famous brazilwood. Following the patent for the synthesis of alizarin in 1868, synthetic versions of the pigment began to appear in the late 19th century.",
            structure: "Organic lake pigment, formed by the precipitation or adsorption of a soluble organic dye onto a solid, insoluble inorganic substrate. The substrate may contain hydrated alumina, aluminum hydroxide, aluminum salts (Al³⁺), chalk, gypsum, clay, barium sulfate, or zinc oxide. Alizarin (1,2-dihydroxyanthraquinone) belongs to the anthraquinone family, featuring interconnected aromatic rings, carbonyl groups, and hydroxyl groups (-OH) that form complexes with metal cations such as Al(III).",
            whyColor: "The conjugated electrons of the anthraquinone rings and their metal complexes absorb specific wavelengths of visible light, reflecting the red range.",
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
        historicalContext: "In 2022, during conservation and restoration studies of paintings at the Piratini Palace, a work registered as having unknown authorship caught the researchers' attention. In the lower right part of the painting, there was a signature: “BENETTE 63”. The work was not identified as belonging to Benette, despite bearing her signature. This finding paved the way for new research on her trajectory, her works, her materials, and her techniques. The investigation also indicated that she was, up to that point, the only female artist represented in the Piratini Palace collection.\n\nBorn in Pelotas/RS in 1925, Benette studied drawing from childhood and was part of the first class of the School of Fine Arts of Pelotas in 1949. She produced works with themes of flowers, still lifes, landscapes, portraits, religious figures, dancers, clowns, and female representations. In them, she used different supports and techniques, such as fabric canvases, Eucatex sheets, varied pictorial techniques, and color combinations. In 1982, she received the Mérito Zona Sul distinction for her contribution to regional art. Benette's story allows us to reflect on how recognition in one's own time does not guarantee permanence in historical memory, especially when it comes to women in the field of arts.",
        structure: "null."
    },

    white: {
        id: "calcium_carbonate",
        type: "material",
        color: "#FFFFFF",
        image: "assets/materials/Calcium_Carbonate.jpg",
        name: "Calcium Carbonate",
        commonName: "Calcium Carbonate",
        formula: "CaCO₃",
            historicalContext: "It is considered probably the oldest white pigment in the world, used since prehistoric periods and in antiquity from mineral sources such as limestone, chalk, marble, and biogenic sources such as oyster shells, corals, and eggshells. Due to its limited hiding power in oily mediums, it was used primarily in the preparation of grounds for painting and in frescoes.",
            structure: "Inorganic salt (inorganic white pigment), with calcite adopted in the characterization of the pigment as its primary mineral form (trigonal / rhombohedral crystal system). In the calcite crystal, Ca²⁺ cations occupy positions coordinated by six oxygens (octahedra), while carbonate groups (CO₃²⁻) form planar arrangements with the negative charge delocalized across the three oxygen atoms.",
            whyColor: "Unlike colored pigments that absorb specific wavelengths, calcium carbonate promotes intense scattering of visible light. The particles deflect visible light in multiple directions without selective absorption, causing the reflected light to return entirely to the eyes and be perceived as white.",
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
            historicalContext: "It emerged in the 19th century as a vibrant alternative to 'Naples Yellow', due to its toxicity. The element cadmium was discovered in 1817 by Friedrich Stromeyer, and the synthesis of CdS was described by Gay-Lussac in 1818, being commercialized starting in the 1840s. It became famous after being widely adopted by Impressionist and Post-Impressionist artists, such as Van Gogh, Henri Matisse, Edvard Munch, and James Ensor.",
            structure: "Inorganic pigment (semiconductor inorganic salt/compound) of mixed character (ionic and covalent contribution), with charge transfer from Cadmium (Cd²⁺) to Sulfur (S²⁻). It occurs in nature mainly in two crystalline polymorphic forms: greenockite (hexagonal / wurtzite structure) and hawleyite (cubic / zinc blende structure).",
            whyColor: "CdS is a semiconductor with a band gap energy of approximately 2.42 eV. When light strikes the pigment, electrons absorb energy and jump from the valence band to the conduction band. The wavelengths not absorbed correspond to the yellow to orange ranges, which are reflected to our eyes.",
            chemicalStructure: {
                modelName: "cadmium_sulfide",
                atoms: [
                    { element: "Cd" },
                    { element: "S" }
                ]
            }
    }
};
