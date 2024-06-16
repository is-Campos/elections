export const allCandidatos = [
  {
    id: "1",
    nombreCompleto: "María López Hernández",
    partidoPolitico: "Partido Acción Nacional",
    abreviaturaPartido: "PAN",
    propuestas: [
      "Mejorar la infraestructura educativa",
      "Impulsar la economía local",
      "Fortalecer la seguridad pública",
    ],
    foto: null,
    cargoPolitico: "Presidente de México",
    candidaturaId: 1,
    idPartido: 1  // Partido Acción Nacional
  },
  {
    id: "2",
    nombreCompleto: "Carlos Sánchez García",
    partidoPolitico: "Partido Revolucionario Institucional",
    abreviaturaPartido: "PRI",
    propuestas: [
      "Reforma energética",
      "Desarrollo sostenible",
      "Mejora de servicios de salud",
    ],
    foto: null,
    cargoPolitico: "Presidente de México",
    candidaturaId: 2,
    idPartido: 2  // Partido Revolucionario Institucional
  },
  {
    id: "3",
    nombreCompleto: "Ana María Pérez Castillo",
    partidoPolitico: "Partido de la Revolución Democrática",
    abreviaturaPartido: "PRD",
    propuestas: [
      "Educación gratuita y de calidad",
      "Reforma laboral",
      "Protección del medio ambiente",
    ],
    foto: null,
    cargoPolitico: "Presidente de México",
    candidaturaId: 3,
    idPartido: 3  // Partido de la Revolución Democrática
  },
  {
    id: "4",
    nombreCompleto: "Luis González Torres",
    partidoPolitico: "Partido Acción Nacional",
    abreviaturaPartido: "PAN",
    propuestas: [
      "Transparencia en el gobierno",
      "Apoyo a pequeñas empresas",
      "Fortalecimiento del sistema educativo",
    ],
    foto: null,
    cargoPolitico: "Gobernador de Jalisco",
    candidaturaId: 4,
    idPartido: 1  // Partido Acción Nacional
  },
  {
    id: "5",
    nombreCompleto: "Sofía Martínez Jiménez",
    partidoPolitico: "Partido Revolucionario Institucional",
    abreviaturaPartido: "PRI",
    propuestas: [
      "Impulso al turismo",
      "Mejora del transporte público",
      "Programa de vivienda digna",
    ],
    foto: null,
    cargoPolitico: "Gobernador de Jalisco",
    candidaturaId: 5,
    idPartido: 2  // Partido Revolucionario Institucional
  },
  {
    id: "6",
    nombreCompleto: "Miguel Ángel Domínguez",
    partidoPolitico: "Partido de la Revolución Democrática",
    abreviaturaPartido: "PRD",
    propuestas: [
      "Fomento a la cultura",
      "Reforma del sistema de salud",
      "Plan de seguridad integral",
    ],
    foto: null,
    cargoPolitico: "Gobernador de Jalisco",
    candidaturaId: 6,
    idPartido: 3  // Partido de la Revolución Democrática
  },
  {
    id: "7",
    nombreCompleto: "Fernando Ruiz Medina",
    partidoPolitico: "Partido Acción Nacional",
    abreviaturaPartido: "PAN",
    propuestas: [
      "Inversión en infraestructura",
      "Fortalecimiento de la seguridad",
      "Fomento al deporte",
    ],
    foto: null,
    cargoPolitico: "Presidente Municipal de Monterrey",
    candidaturaId: 7,
    idPartido: 1  // Partido Acción Nacional
  },
  {
    id: "8",
    nombreCompleto: "Lucía Ramírez Solís",
    partidoPolitico: "Partido Revolucionario Institucional",
    abreviaturaPartido: "PRI",
    propuestas: [
      "Desarrollo urbano",
      "Apoyo a emprendedores",
      "Mejora del sistema de salud",
    ],
    foto: null,
    cargoPolitico: "Presidente Municipal de Monterrey",
    candidaturaId: 8,
    idPartido: 2  // Partido Revolucionario Institucional
  },
  {
    id: "9",
    nombreCompleto: "Ricardo Vázquez Gutiérrez",
    partidoPolitico: "Partido de la Revolución Democrática",
    abreviaturaPartido: "PRD",
    propuestas: [
      "Mejora del transporte público",
      "Programa de vivienda",
      "Reforestación urbana",
    ],
    foto: null,
    cargoPolitico: "Presidente Municipal de Monterrey",
    candidaturaId: 9,
    idPartido: 3  // Partido de la Revolución Democrática
  },
  {
    id: "10",
    nombreCompleto: "Jorge López Mendoza",
    partidoPolitico: "Partido Acción Nacional",
    abreviaturaPartido: "PAN",
    propuestas: [
      "Mejora del sistema de salud",
      "Fortalecimiento de la educación",
      "Impulso al turismo",
    ],
    foto: null,
    cargoPolitico: "Gobernador de Yucatán",
    candidaturaId: 10,
    idPartido: 1  // Partido Acción Nacional
  },
  {
    id: "11",
    nombreCompleto: "Rosa María González",
    partidoPolitico: "Partido Revolucionario Institucional",
    abreviaturaPartido: "PRI",
    propuestas: [
      "Desarrollo económico",
      "Mejora de la infraestructura",
      "Reforma educativa",
    ],
    foto: null,
    cargoPolitico: "Gobernador de Yucatán",
    candidaturaId: 11,
    idPartido: 2  // Partido Revolucionario Institucional
  },
  {
    id: "12",
    nombreCompleto: "Pedro Morales Álvarez",
    partidoPolitico: "Partido de la Revolución Democrática",
    abreviaturaPartido: "PRD",
    propuestas: [
      "Protección al medio ambiente",
      "Promoción del deporte",
      "Reforma fiscal",
    ],
    foto: null,
    cargoPolitico: "Gobernador de Yucatán",
    candidaturaId: 12,
    idPartido: 3  // Partido de la Revolución Democrática
  },
];


export const presidentesMexico = allCandidatos.filter(
  (candidato) => candidato.cargoPolitico === "Presidente de México"
);

export const gobJalisco = allCandidatos.filter(
  (candidato) => candidato.cargoPolitico === "Gobernador de Jalisco"
);

export const presMonterrey = allCandidatos.filter(
  (candidato) => candidato.cargoPolitico === "Presidente Municipal de Monterrey"
);

export const gobYucatan = allCandidatos.filter(
  (candidato) => candidato.cargoPolitico === "Gobernador de Yucatán"
);
