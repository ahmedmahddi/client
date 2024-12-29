import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WhyChooseUs: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="container section-bg-image bg-pattern-2"
      style={{ paddingTop: '50px' }}
    >
      <div className="section-content">
        <div className="row d-flex">
          <motion.div
            variants={itemVariants}
            className="col-lg-6 col-md-12 m-b30"
          >
            <img 
              src="/images/placeholders/zippa.jpeg" 
              alt="Signature"
              style={{
                height: '675px', 
                width: '675px', 
                borderRadius: '5px', 
                boxShadow: '10px 10px 50px 10px rgb(50 50 50 / 50%)',
              }}
            />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="col-lg-6 col-md-12 m-b15 align-self-center"
          >
            <div className="content-bx1">
              <motion.h1 variants={itemVariants} className="m-b15 p-b15">Pourquoi nous choisir?</motion.h1>
              <motion.ul variants={itemVariants} className="m-b15" style={{ listStyle: 'none' }}>
                <motion.li variants={itemVariants} className="p-b15">
                  <i className="fa fa-check"></i> 
                  <strong>Expertise et Expérience :</strong> Plus de 25 ans d'expérience dans le domaine des menuiseries en aluminium et PVC.
                </motion.li>
                <motion.li variants={itemVariants} className="p-b15">
                  <i className="fa fa-check"></i> 
                  <strong>Solutions Sur Mesure :</strong> Des produits personnalisés adaptés à vos besoins spécifiques.
                </motion.li>
                <motion.li variants={itemVariants} className="p-b15">
                  <i className="fa fa-check"></i> 
                  <strong>Matériaux de Haute Qualité :</strong> Utilisation des meilleurs matériaux pour garantir la durabilité et l'esthétique.
                </motion.li>
                <motion.li variants={itemVariants} className="p-b15">
                  <i className="fa fa-check"></i> 
                  <strong>Service Complet :</strong> De la conception à la maintenance, nous assurons un suivi à chaque étape.
                </motion.li>
                <motion.li variants={itemVariants} className="p-b15">
                  <i className="fa fa-check"></i> 
                  <strong>Satisfaction Client :</strong> Engagement à fournir un service irréprochable et à dépasser vos attentes.
                </motion.li>
              </motion.ul>
              
              <motion.div variants={itemVariants} className="mot-du-fondateur m-b15">
                <h3>Mot du Fondateur</h3>
                <p>
                  "Chez SOMATRAP, nous plaçons l'excellence et l'innovation au cœur de chaque projet. Merci de nous faire confiance pour transformer vos espaces avec passion et dévouement."
                </p>
              </motion.div>
              
              <motion.img 
                variants={itemVariants}
                className="alignright" 
                src="/images/signature (1).png" 
                width="200" 
                alt="Signature du Fondateur" 
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default WhyChooseUs;