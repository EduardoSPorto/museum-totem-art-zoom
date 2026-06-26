const PIGMENTS = {
  red: {
    id: "vermilion",
    name: "Vermilion",
    commonName: "Mercury Sulfide",
    formula: "HgS",
    color: "#C41E3A",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Cinnabar-sample.jpg/440px-Cinnabar-sample.jpg",
    imageAlt: "Natural cinnabar mineral (mercury sulfide)",
    description: "A brilliant red pigment created from mercury sulfide. Historically one of the most prized reds in Asian and European art.",
    whyRed: "Mercury and sulfur atoms in the crystal structure create specific energy levels that absorb blue and green light wavelengths, reflecting red light to our eyes.",
    chemistry: {
      elements: "Mercury (Hg) + Sulfur (S)",
      structure: "Hexagonal crystal lattice",
      bandGap: "~2.1 eV",
      lightAbsorption: "Absorbs λ < 620nm"
    },
    historical: "Extensively used in Chinese lacquerware, Japanese art, and European paintings from medieval times through the 19th century.",
    properties: [
      "Extremely bright and saturated",
      "Chemically stable when not exposed to light",
      "Toxic: contains mercury vapor (avoid inhalation)",
      "Darkens over time in some conditions (photodegradation)"
    ],
    occurrence: "Naturally occurs as cinnabar mineral; synthesized in laboratories",
    molecule: {
      name: "Mercury Sulfide",
      formula: "HgS",
      molecularWeight: 232.66,
      atoms: [
        { element: "Hg", x: 0, y: 0, z: 0, radius: 1.4, color: "#D4AF37" },
        { element: "S", x: 2.2, y: 0, z: 0, radius: 1.0, color: "#FFFF00" }
      ],
      bonds: [
        { from: 0, to: 1, type: "single", length: 2.2, color: "#888888" }
      ],
      structure: "Hexagonal crystal system - each Hg binds to 4 S atoms in real crystal"
    }
  },
  white: {
    id: "lead_white",
    name: "Lead White",
    commonName: "Basic Lead Carbonate",
    formula: "2PbCO₃·Pb(OH)₂",
    color: "#F5F5F0",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Lead%28II%29_carbonate.jpg/440px-Lead%28II%29_carbonate.jpg",
    imageAlt: "Lead carbonate powder (lead white pigment)",
    description: "The most important white pigment in fine art for over 2,000 years. Used in oil painting, tempera, and frescoes.",
    whyWhite: "The crystal structure of lead carbonate scatters and reflects all visible light wavelengths equally, making it pure white. Its particles also scatter light internally (Mie scattering).",
    chemistry: {
      elements: "Lead (Pb) + Carbon (C) + Oxygen (O) + Hydrogen (H)",
      structure: "Monoclinic crystal system",
      refractiveIndex: "1.94 (very high)",
      opacityMechanism: "Mie scattering of light particles"
    },
    historical: "Known as 'ceruse' in ancient Rome. Produced by corroding lead strips with vinegar or dung. Essential to Old Masters' techniques.",
    properties: [
      "Excellent covering power (opaque)",
      "Mixes smoothly with oils",
      "Slightly toxic (lead content)",
      "Can yellow slightly over centuries",
      "Dries faster than titanium white"
    ],
    occurrence: "Created synthetically; not found naturally as a paint pigment. Modern alternative: titanium dioxide (TiO₂)",
    molecule: {
      name: "Lead Carbonate",
      formula: "PbCO₃",
      molecularWeight: 267.21,
      atoms: [
        { element: "Pb", x: 0, y: 0, z: 0, radius: 1.4, color: "#6B7280" },
        { element: "C", x: 2.0, y: 0, z: 0, radius: 0.8, color: "#202020" },
        { element: "O", x: 2.0, y: 1.2, z: 0, radius: 0.7, color: "#FF4444" },
        { element: "O", x: 2.0, y: -1.2, z: 0, radius: 0.7, color: "#FF4444" },
        { element: "O", x: 3.2, y: 0, z: 0, radius: 0.7, color: "#FF4444" }
      ],
      bonds: [
        { from: 0, to: 1, type: "single", length: 2.0, color: "#666666" },
        { from: 1, to: 2, type: "double", length: 1.2, color: "#666666" },
        { from: 1, to: 3, type: "single", length: 1.2, color: "#666666" },
        { from: 1, to: 4, type: "single", length: 1.2, color: "#666666" }
      ],
      structure: "Monoclinic crystal - Lead carbonate forms the core white pigment"
    }
  }
};
