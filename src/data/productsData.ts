export interface ProductDetail {
  id: string;
  title: string;
  description: string;
  features: string[];
  specifications: {
    title: string;
    value: string;
  }[];
  image: string;
  icon: string;
}

export const productsData: Record<string, ProductDetail> = {
  "menuiseries-coulissantes": {
    id: "menuiseries-coulissantes",
    title: "Menuiseries coulissantes",
    description: "portes et fenêtres offrant une isolation performante et un design moderne.",
    features: [
      "Système de roulement silencieux",
      "Double ou triple vitrage",
      "Étanchéité à l'air et à l'eau",
      "Design contemporain",
      "Installation professionnelle"
    ],
    specifications: [
      { title: "Matériau", value: "Aluminium" },
      { title: "Isolation", value: "Uw ≤ 1.4 W/m²K" },
      { title: "Sécurité", value: "RC2/RC3" },
      { title: "Garantie", value: "10 ans" }
    ],
    image: "/images/window1.jpg",
    icon: "/images/icon/sliding-door.png"
  },
  "murs-rideaux": {
    id: "murs-rideaux",
    title: "Murs rideaux",
    description: "solutions architecturales pour des façades vitrées élégantes.",
    features: [
      "Structure autoportante",
      "Vitrage haute performance",
      "Design personnalisable",
      "Protection solaire",
      "Isolation optimale"
    ],
    specifications: [
      { title: "Épaisseur", value: "50-60mm" },
      { title: "Performance", value: "Ucw ≤ 1.5 W/m²K" },
      { title: "Résistance", value: "Classe C4" },
      { title: "Acoustique", value: "42 dB" }
    ],
    image: "/images/mur-rideaux.jpg",
    icon: "/images/icon/window.png"
  },
  "volets-roulants": {
    id: "volets-roulants",
    title: "Volets roulants",
    description: "systèmes de protection solaire et de sécurité.",
    features: [
      "Motorisation intelligente",
      "Isolation thermique",
      "Commande à distance",
      "Installation sur mesure",
      "Maintenance facile"
    ],
    specifications: [
      { title: "Matériau", value: "Aluminium" },
      { title: "Hauteur max", value: "3500mm" },
      { title: "Résistance", value: "Classe 6" },
      { title: "Motorisation", value: "Somfy" }
    ],
    image: "/images/volet-roulant.jpg",
    icon: "/images/icon/garage.png"
  },
  "garde-corps": {
    id: "garde-corps",
    title: "Garde-corps",
    description: "éléments de sécurité alliant robustesse et design.",
    features: [
      "Design moderne",
      "Sécurité maximale",
      "Résistance aux intempéries",
      "Installation conforme",
      "Personnalisable"
    ],
    specifications: [
      { title: "Hauteur", value: "1000mm" },
      { title: "Matériau", value: "Aluminium/Verre" },
      { title: "Norme", value: "NF P01-012" },
      { title: "Finition", value: "Anodisée" }
    ],
    image: "/images/garde-corp.jpg",
    icon: "/images/icon/stairs.png"
  },
  "cabines-douche": {
    id: "cabines-douche",
    title: "Cabines de douche",
    description: "Solutions modernes et élégantes pour cabines de douches.",
    features: [
      "Verre sécurit",
      "Traitement anticalcaire",
      "Profilés minimalistes",
      "Sur mesure",
      "Design moderne"
    ],
    specifications: [
      { title: "Verre", value: "8mm" },
      { title: "Hauteur", value: "2000mm" },
      { title: "Traitement", value: "Anticalcaire" },
      { title: "Finition", value: "Chrome" }
    ],
    image: "/images/douche2.jpg",
    icon: "/images/icon/shower.png"
  },
  "alucobond": {
    id: "alucobond",
    title: "Alucobond",
    description: "panneaux composites en aluminium pour l'habillage de façades.",
    features: [
      "Légèreté",
      "Rigidité élevée",
      "Résistance aux intempéries",
      "Installation rapide",
      "Large gamme de couleurs"
    ],
    specifications: [
      { title: "Épaisseur", value: "4mm" },
      { title: "Poids", value: "7.6 kg/m²" },
      { title: "Classement feu", value: "B-s1,d0" },
      { title: "Garantie", value: "20 ans" }
    ],
    image: "/images/alucobond.jpeg",
    icon: "/images/icon/frame.png"
  }
};
