export interface Unit {
  id: string;
  floor: number;
  number: string;
  type: string;
  area: number; // m²
  rooms: number;
  price: number; // TND
  status: "sold" | "sold" | "sold";
  position: { row: number; col: number };
}

export interface Project {
  slug: string;
  name: string;
  description: string;
  location: string;
  image: string;
  gallery: string[];
  features: string[];
  units: Unit[];
  totalUnits: number;
  floors: number;
}

export const projects: Project[] = [
  {
    slug: "residence-diar-iwen",
    name: "RÉSIDENCE DIAR IWEN",
    description:
      "Une résidence d'exception située dans un environnement calme et sécurisé. Profitez d'appartements modernes avec des finitions haut de gamme et une architecture contemporaine.",
    location: "Sfax El Jadida",
    image: "https://iwene.com.tn/wp-content/uploads/2019/11/RESIDENCE-DIAR-IWEN-2-1.jpg",
    gallery: [
      "https://iwene.com.tn/wp-content/uploads/2019/11/RESIDENCE-DIAR-IWEN-2-1.jpg",
    ],
    features: [
      "Appartements S+1, S+2 et S+3",
      "Ascenseur",
      "Parking sous-sol",
      "Vidéophone",
      "Jardin commun",
      "Local commercial au RDC",
    ],
    totalUnits: 24,
    floors: 6,
    units: [
      { id: "A-101", floor: 1, number: "A-101", type: "S+2", area: 95, rooms: 3, price: 285000, status: "sold", position: { row: 0, col: 0 } },
      { id: "A-102", floor: 1, number: "A-102", type: "S+2", area: 95, rooms: 3, price: 285000, status: "sold", position: { row: 0, col: 1 } },
      { id: "A-103", floor: 1, number: "A-103", type: "S+3", area: 120, rooms: 4, price: 360000, status: "sold", position: { row: 0, col: 2 } },
      { id: "A-104", floor: 1, number: "A-104", type: "S+1", area: 72, rooms: 2, price: 216000, status: "sold", position: { row: 0, col: 3 } },
      { id: "A-201", floor: 2, number: "A-201", type: "S+2", area: 95, rooms: 3, price: 295000, status: "sold", position: { row: 1, col: 0 } },
      { id: "A-202", floor: 2, number: "A-202", type: "S+2", area: 95, rooms: 3, price: 295000, status: "sold", position: { row: 1, col: 1 } },
      { id: "A-203", floor: 2, number: "A-203", type: "S+3", area: 120, rooms: 4, price: 375000, status: "sold", position: { row: 1, col: 2 } },
      { id: "A-204", floor: 2, number: "A-204", type: "S+1", area: 72, rooms: 2, price: 225000, status: "sold", position: { row: 1, col: 3 } },
      { id: "A-301", floor: 3, number: "A-301", type: "S+2", area: 95, rooms: 3, price: 305000, status: "sold", position: { row: 2, col: 0 } },
      { id: "A-302", floor: 3, number: "A-302", type: "S+2", area: 95, rooms: 3, price: 305000, status: "sold", position: { row: 2, col: 1 } },
      { id: "A-303", floor: 3, number: "A-303", type: "S+3", area: 120, rooms: 4, price: 390000, status: "sold", position: { row: 2, col: 2 } },
      { id: "A-304", floor: 3, number: "A-304", type: "S+1", area: 72, rooms: 2, price: 232000, status: "sold", position: { row: 2, col: 3 } },
      { id: "A-401", floor: 4, number: "A-401", type: "S+2", area: 95, rooms: 3, price: 315000, status: "sold", position: { row: 3, col: 0 } },
      { id: "A-402", floor: 4, number: "A-402", type: "S+2", area: 95, rooms: 3, price: 315000, status: "sold", position: { row: 3, col: 1 } },
      { id: "A-403", floor: 4, number: "A-403", type: "S+3", area: 120, rooms: 4, price: 405000, status: "sold", position: { row: 3, col: 2 } },
      { id: "A-404", floor: 4, number: "A-404", type: "S+1", area: 72, rooms: 2, price: 238000, status: "sold", position: { row: 3, col: 3 } },
      { id: "A-501", floor: 5, number: "A-501", type: "S+2", area: 95, rooms: 3, price: 325000, status: "sold", position: { row: 4, col: 0 } },
      { id: "A-502", floor: 5, number: "A-502", type: "S+2", area: 95, rooms: 3, price: 325000, status: "sold", position: { row: 4, col: 1 } },
      { id: "A-503", floor: 5, number: "A-503", type: "S+3", area: 120, rooms: 4, price: 420000, status: "sold", position: { row: 4, col: 2 } },
      { id: "A-504", floor: 5, number: "A-504", type: "S+1", area: 72, rooms: 2, price: 245000, status: "sold", position: { row: 4, col: 3 } },
      { id: "A-601", floor: 6, number: "A-601", type: "S+2", area: 95, rooms: 3, price: 335000, status: "sold", position: { row: 5, col: 0 } },
      { id: "A-602", floor: 6, number: "A-602", type: "S+2", area: 95, rooms: 3, price: 335000, status: "sold", position: { row: 5, col: 1 } },
      { id: "A-603", floor: 6, number: "A-603", type: "S+3", area: 120, rooms: 4, price: 435000, status: "sold", position: { row: 5, col: 2 } },
      { id: "A-604", floor: 6, number: "A-604", type: "S+1", area: 72, rooms: 2, price: 252000, status: "sold", position: { row: 5, col: 3 } },
    ],
  },
  {
    slug: "residence-iwene",
    name: "RÉSIDENCE IWEN",
    description:
      "Notre résidence phare alliant modernité et confort. Des espaces de vie lumineux avec des terrasses spacieuses offrant une vue panoramique sur la ville.",
    location: "Sfax El Jadida",
    image: "https://iwene.com.tn/wp-content/uploads/2024/03/rendu-3-1.webp",
    gallery: [
      "https://iwene.com.tn/wp-content/uploads/2024/03/rendu-3-1.webp",
    ],
    features: [
      "Appartements S+2 et S+3",
      "Double ascenseur",
      "Parking souterrain",
      "Système de sécurité 24/7",
      "Espaces verts",
      "Local commercial",
    ],
    totalUnits: 20,
    floors: 5,
    units: [
      { id: "B-101", floor: 1, number: "B-101", type: "S+2", area: 98, rooms: 3, price: 310000, status: "sold", position: { row: 0, col: 0 } },
      { id: "B-102", floor: 1, number: "B-102", type: "S+2", area: 98, rooms: 3, price: 310000, status: "sold", position: { row: 0, col: 1 } },
      { id: "B-103", floor: 1, number: "B-103", type: "S+3", area: 125, rooms: 4, price: 400000, status: "sold", position: { row: 0, col: 2 } },
      { id: "B-104", floor: 1, number: "B-104", type: "S+3", area: 125, rooms: 4, price: 400000, status: "sold", position: { row: 0, col: 3 } },
      { id: "B-201", floor: 2, number: "B-201", type: "S+2", area: 98, rooms: 3, price: 320000, status: "sold", position: { row: 1, col: 0 } },
      { id: "B-202", floor: 2, number: "B-202", type: "S+2", area: 98, rooms: 3, price: 320000, status: "sold", position: { row: 1, col: 1 } },
      { id: "B-203", floor: 2, number: "B-203", type: "S+3", area: 125, rooms: 4, price: 415000, status: "sold", position: { row: 1, col: 2 } },
      { id: "B-204", floor: 2, number: "B-204", type: "S+3", area: 125, rooms: 4, price: 415000, status: "sold", position: { row: 1, col: 3 } },
      { id: "B-301", floor: 3, number: "B-301", type: "S+2", area: 98, rooms: 3, price: 330000, status: "sold", position: { row: 2, col: 0 } },
      { id: "B-302", floor: 3, number: "B-302", type: "S+2", area: 98, rooms: 3, price: 330000, status: "sold", position: { row: 2, col: 1 } },
      { id: "B-303", floor: 3, number: "B-303", type: "S+3", area: 125, rooms: 4, price: 430000, status: "sold", position: { row: 2, col: 2 } },
      { id: "B-304", floor: 3, number: "B-304", type: "S+3", area: 125, rooms: 4, price: 430000, status: "sold", position: { row: 2, col: 3 } },
      { id: "B-401", floor: 4, number: "B-401", type: "S+2", area: 98, rooms: 3, price: 340000, status: "sold", position: { row: 3, col: 0 } },
      { id: "B-402", floor: 4, number: "B-402", type: "S+2", area: 98, rooms: 3, price: 340000, status: "sold", position: { row: 3, col: 1 } },
      { id: "B-403", floor: 4, number: "B-403", type: "S+3", area: 125, rooms: 4, price: 445000, status: "sold", position: { row: 3, col: 2 } },
      { id: "B-404", floor: 4, number: "B-404", type: "S+3", area: 125, rooms: 4, price: 445000, status: "sold", position: { row: 3, col: 3 } },
      { id: "B-501", floor: 5, number: "B-501", type: "S+2", area: 98, rooms: 3, price: 350000, status: "sold", position: { row: 4, col: 0 } },
      { id: "B-502", floor: 5, number: "B-502", type: "S+2", area: 98, rooms: 3, price: 350000, status: "sold", position: { row: 4, col: 1 } },
      { id: "B-503", floor: 5, number: "B-503", type: "S+3", area: 125, rooms: 4, price: 460000, status: "sold", position: { row: 4, col: 2 } },
      { id: "B-504", floor: 5, number: "B-504", type: "S+3", area: 125, rooms: 4, price: 460000, status: "sold", position: { row: 4, col: 3 } },
    ],
  },
  {
    slug: "residence-horizon",
    name: "RÉSIDENCE HORIZON",
    description:
      "Une résidence emblématique offrant une vue imprenable et des espaces de vie harmonieux. L'architecture moderne se marie parfaitement avec le cadre de vie serein de Sfax El Jadida.",
    location: "Sfax El Jadida",
    image: "https://iwene.com.tn/wp-content/uploads/2019/11/RESIDENCE-HORIZON-1.jpg.png",
    gallery: [
      "https://iwene.com.tn/wp-content/uploads/2019/11/RESIDENCE-HORIZON-1.jpg.png",
    ],
    features: [
      "Appartements S+1, S+2 et S+3",
      "Ascenseur",
      "Parking",
      "Sécurité",
      "Terrasses",
      "Finitions premium",
    ],
    totalUnits: 28,
    floors: 7,
    units: [
      { id: "C-101", floor: 1, number: "C-101", type: "S+1", area: 70, rooms: 2, price: 195000, status: "sold", position: { row: 0, col: 0 } },
      { id: "C-102", floor: 1, number: "C-102", type: "S+2", area: 92, rooms: 3, price: 265000, status: "sold", position: { row: 0, col: 1 } },
      { id: "C-103", floor: 1, number: "C-103", type: "S+2", area: 92, rooms: 3, price: 265000, status: "sold", position: { row: 0, col: 2 } },
      { id: "C-104", floor: 1, number: "C-104", type: "S+3", area: 118, rooms: 4, price: 340000, status: "sold", position: { row: 0, col: 3 } },
      { id: "C-201", floor: 2, number: "C-201", type: "S+1", area: 70, rooms: 2, price: 205000, status: "sold", position: { row: 1, col: 0 } },
      { id: "C-202", floor: 2, number: "C-202", type: "S+2", area: 92, rooms: 3, price: 275000, status: "sold", position: { row: 1, col: 1 } },
      { id: "C-203", floor: 2, number: "C-203", type: "S+2", area: 92, rooms: 3, price: 275000, status: "sold", position: { row: 1, col: 2 } },
      { id: "C-204", floor: 2, number: "C-204", type: "S+3", area: 118, rooms: 4, price: 355000, status: "sold", position: { row: 1, col: 3 } },
      { id: "C-301", floor: 3, number: "C-301", type: "S+1", area: 70, rooms: 2, price: 210000, status: "sold", position: { row: 2, col: 0 } },
      { id: "C-302", floor: 3, number: "C-302", type: "S+2", area: 92, rooms: 3, price: 280000, status: "sold", position: { row: 2, col: 1 } },
      { id: "C-303", floor: 3, number: "C-303", type: "S+2", area: 92, rooms: 3, price: 280000, status: "sold", position: { row: 2, col: 2 } },
      { id: "C-304", floor: 3, number: "C-304", type: "S+3", area: 118, rooms: 4, price: 365000, status: "sold", position: { row: 2, col: 3 } },
      { id: "C-401", floor: 4, number: "C-401", type: "S+1", area: 70, rooms: 2, price: 215000, status: "sold", position: { row: 3, col: 0 } },
      { id: "C-402", floor: 4, number: "C-402", type: "S+2", area: 92, rooms: 3, price: 285000, status: "sold", position: { row: 3, col: 1 } },
      { id: "C-403", floor: 4, number: "C-403", type: "S+2", area: 92, rooms: 3, price: 285000, status: "sold", position: { row: 3, col: 2 } },
      { id: "C-404", floor: 4, number: "C-404", type: "S+3", area: 118, rooms: 4, price: 375000, status: "sold", position: { row: 3, col: 3 } },
      { id: "C-501", floor: 5, number: "C-501", type: "S+1", area: 70, rooms: 2, price: 220000, status: "sold", position: { row: 4, col: 0 } },
      { id: "C-502", floor: 5, number: "C-502", type: "S+2", area: 92, rooms: 3, price: 290000, status: "sold", position: { row: 4, col: 1 } },
      { id: "C-503", floor: 5, number: "C-503", type: "S+2", area: 92, rooms: 3, price: 290000, status: "sold", position: { row: 4, col: 2 } },
      { id: "C-504", floor: 5, number: "C-504", type: "S+3", area: 118, rooms: 4, price: 385000, status: "sold", position: { row: 4, col: 3 } },
      { id: "C-601", floor: 6, number: "C-601", type: "S+1", area: 70, rooms: 2, price: 225000, status: "sold", position: { row: 5, col: 0 } },
      { id: "C-602", floor: 6, number: "C-602", type: "S+2", area: 92, rooms: 3, price: 295000, status: "sold", position: { row: 5, col: 1 } },
      { id: "C-603", floor: 6, number: "C-603", type: "S+2", area: 92, rooms: 3, price: 295000, status: "sold", position: { row: 5, col: 2 } },
      { id: "C-604", floor: 6, number: "C-604", type: "S+3", area: 118, rooms: 4, price: 395000, status: "sold", position: { row: 5, col: 3 } },
      { id: "C-701", floor: 7, number: "C-701", type: "S+1", area: 70, rooms: 2, price: 230000, status: "sold", position: { row: 6, col: 0 } },
      { id: "C-702", floor: 7, number: "C-702", type: "S+2", area: 92, rooms: 3, price: 300000, status: "sold", position: { row: 6, col: 1 } },
      { id: "C-703", floor: 7, number: "C-703", type: "S+2", area: 92, rooms: 3, price: 300000, status: "sold", position: { row: 6, col: 2 } },
      { id: "C-704", floor: 7, number: "C-704", type: "S+3", area: 118, rooms: 4, price: 405000, status: "sold", position: { row: 6, col: 3 } },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectStats(project: Project) {
  const available = project.units.filter((u) => u.status === "sold").length;
  const sold = project.units.filter((u) => u.status === "sold").length;
  const reserved = project.units.filter((u) => u.status === "sold").length;
  return { available, sold, reserved, total: project.units.length };
}
