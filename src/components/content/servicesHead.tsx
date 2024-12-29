import { ReactElement, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ServicesHead = (): ReactElement => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2, delay: 0.2 } },
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, delay: 0.4 } },
  };

  return (
    <motion.div
      ref={ref}
      className="section-full content-inner-2 bg-primary"
      style={{
        backgroundImage: `url('/images/patterns/map-bg.png')`,
        padding: "20px 0px",
      }}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center service-info">
            <motion.h2
              className="title text-white"
              variants={textVariants}
            >
              Chaque étape vers la réalisation de votre vision est amplifiée
              par notre mélange de fonctionnalité et d'importance.
            </motion.h2>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesHead;