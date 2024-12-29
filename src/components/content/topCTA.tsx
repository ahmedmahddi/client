import { ReactElement, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TopCTA = (): ReactElement => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="section-full call-action"
      style={{ backgroundColor: "#224067" }}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-9 text-white">
            <motion.h2
              className="title"
              style={{ color: "#fff" }}
              variants={itemVariants}
            >
              La Menuiserie Moderne Qui Définit Votre Espace
            </motion.h2>
            <motion.p
              className="m-b0"
              style={{ color: " #fff" }}
              variants={itemVariants}
            >
              Explorez notre expertise en menuiserie pour transformer chaque
              espace avec style et fonctionnalité, grâce à nos solutions
              personnalisées en aluminium et PVC.
            </motion.p>
          </div>
          <div className="col-lg-3 d-flex">
            <motion.a
              href="./contact.html"
              className="site-button align-self-center outline ms-auto outline-2 btnhover20"
              style={{ color: "#fff", borderColor: " #A5B5D1" }}
              variants={itemVariants}
            >
              Nous Joindre
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopCTA;