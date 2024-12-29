import React from "react";
import { motion } from "framer-motion";

interface ContentItem {
  title: string;
  subtitle: string;
  description: string;
}

interface CardItem {
  icon: string;
  title: string;
  description: string;
}

const WhoWeAre: React.FC = () => {
  const content: ContentItem = {
    title: "Qui Sommes Nous ?",
    subtitle: "Une entreprise dédiée à la conception, fabrication, service et maintenance de menuiseries en aluminium et PVC.",
    description: "Depuis plus de 20 ans, SOMATRAP conçoit et fabrique des menuiseries en aluminium et PVC alliant qualité, durabilité et design moderne. Notre expertise et notre engagement assurent un service complet, de la conception à la maintenance, garantissant la satisfaction de nos clients. Nous nous engageons à offrir des solutions complètes et sur mesure pour la menuiserie en aluminium et PVC. Notre expertise couvre tout, de la conception initiale à la fabrication précise, jusqu'à l'installation et l'entretien régulier, garantissant la durabilité et la qualité supérieure de chaque projet."
  };

  const cards: CardItem[] = [
    {
      icon: "fa-bullseye",
      title: "Notre Mission",
      description: "Redéfinir les standards des menuiseries en aluminium et PVC en offrant des solutions innovantes et durables."
    },
    {
      icon: "fa-eye",
      title: "Notre Vision",
      description: "Devenir le leader du marché en menuiseries, reconnu pour notre excellence et notre engagement envers la qualité."
    },
    {
      icon: "fa-heart",
      title: "Nos Valeurs",
      description: "Intégrité, innovation et satisfaction client sont au cœur de nos actions et décisions."
    }
  ];

  return (
    <div className="section-content content-inner section-bg-image bg-pattern-2">
      <div className="container">
        <div className="section-content">
          <div className="row d-flex">
            <div className="col-lg-12 col-md-12 m-b30 align-self-center">
              <motion.div 
                className="content-bx1"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="m-b15 title" style={{ color: "#224067" }}>
                  {content.title}
                </h1>
                <h3 className="m-b15">
                  <span className="text-secondary">
                    {content.subtitle}
                  </span>
                </h3>
                <p className="m-b30">
                  {content.description.split(". ").map((sentence, index) => (
                    <React.Fragment key={index}>
                      {sentence.includes("SOMATRAP") ? (
                        <>
                          {sentence.split("SOMATRAP")[0]}
                          <span style={{ color: "#224067", fontWeight: "bold" }}>
                            SOMATRAP
                          </span>
                          {sentence.split("SOMATRAP")[1]}
                        </>
                      ) : (
                        sentence
                      )}
                      {index < content.description.split(". ").length - 1 && ". "}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-full content-inner-2 bg-primary overlay-primary-middle service-section" style={{ paddingBottom: "20px", paddingTop: "5px" }}>
        <div className="container">
          <div className="row" style={{ paddingTop: "35px" }}>
            {cards.map((card, index) => (
              <motion.div 
                key={index} 
                className="col-lg-4 col-md-4 col-sm-12 mb-4"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="service-card">
                  <div className="service-icon">
                    <i className={`fa ${card.icon}`}></i>
                  </div>
                  <div className="service-title">{card.title}</div>
                  <div className="service-description">{card.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
