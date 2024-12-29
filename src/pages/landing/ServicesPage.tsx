import { ReactElement } from 'react';
import Banner from 'components/banner/banner';
import OurTrajectory from 'components/ServicesSection/Trajectory';
import Products from 'components/ServicesSection/Products';
import ContactCTA from 'components/ServicesSection/ContactCTA';
import ProjectCardsContainer from 'components/ServicesSection/ServiceSwiper';

type ProjectCardColor = 'blue' | 'red' | 'green' | 'custom';
const projectCards = [
    {
      title: "Fabrication Aluminium et PVC",
      subtitle: "Conception de solutions en aluminium et PVC",
      description: "Fabrication sur mesure de fenêtres, portes, et structures adaptées aux besoins résidentiels et industriels.",
      imageUrl: "/images/Services/fabrication.webp",
      tags: ["Fabrication", "Aluminium", "PVC"],
      color: "custom" as ProjectCardColor,
      customColor: "#224067",
    },
    {
      title: "Solutions sur Mesure",
      subtitle: "Créations uniques pour vos projets",
      description: "Offrir des solutions personnalisées et innovantes qui répondent aux exigences spécifiques des projets clients.",
      imageUrl: "/images/Services/solution.webp",
      tags: ["Design", "Personnalisation", "Innovation"],
      color: "custom" as ProjectCardColor,
      customColor: "#224067",
    },
    {
      title: "Services d'Installation",
      subtitle: "Installation experte de produits en aluminium et PVC",
      description: "Fournir une installation professionnelle et sécurisée de tous les produits pour garantir une longue durée de vie.",
      imageUrl: "/images/Services/installation.webp",
      tags: ["Installation", "Sécurité", "Qualité"],
      color: "custom" as ProjectCardColor,
      customColor: "#224067",
    },
    {
      title: "Maintenance et Réparation",
      subtitle: "Entretien complet pour la durabilité",
      description: "Assurer le bon fonctionnement des installations grâce à des services de maintenance et de réparation de haute qualité.",
      imageUrl: "/images/Services/maintenance.webp",
      tags: ["Maintenance", "Réparation", "Fiabilité"],
      color: "custom" as ProjectCardColor,
      customColor: "#224067",
    },
  ];

const ServicesPage = (): ReactElement => {
  return (
    <div className="page-content section-bg-image bg-pattern-2">
      <Banner title="Nos Services" />
      <OurTrajectory />
      <ProjectCardsContainer cards={projectCards} />;
      <Products />
      <ContactCTA />
    </div>
  );
};

export default ServicesPage;
