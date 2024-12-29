import { ReactElement, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const OurStory = (): ReactElement => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const fadeInFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <motion.div
      ref={ref}
      className="section-full content-inner const-about section-bg-image bg-pattern-2"
      initial="hidden"
      animate={controls}
      variants={fadeInFromLeft}
    >
      <div className="container">
        <div className="row align-items-center">
          <motion.div
            className="col-lg-6 col-md-6 col-sm-12 col-12"
            variants={fadeInFromLeft}
          >
            <div className="radius-sm m-b30 img-ho1">
              <img src="/images/placeholders/zippa.jpeg" alt="" />
            </div>
          </motion.div>
          <motion.div
            className="col-lg-6 col-md-6 col-sm-12 col-12"
            variants={fadeInFromLeft}
          >
            <div className="content-bx1">
              <motion.div className="about-year" variants={fadeInFromLeft}>
                <span>26</span>
                <p>
                  Years<br />
                  Experience<br />
                  Working
                </p>
              </motion.div>
              <motion.div className="section-head style2" variants={fadeInFromLeft}>
                <h2 className="title">
                  Notre Trajectoire d'Excellence<br /> et de Précision{" "}
                  <span className="text-primary">Depuis 2000</span>
                </h2>
                <h4 className="title" style={{ color: " #A5B5D1" }}>
                  Pionniers depuis notre fondation.
                </h4>
                <p>
                  Depuis plus de six décennies, notre évolution de simple
                  atelier à leader de la menuiserie d'aluminium et PVC témoigne
                  de notre engagement pour l'excellence et la précision. Notre
                  gamme inclut fenêtres, portes, clôtures, cabines de douche, et
                  garde-corps sur mesure, chacun conçu pour enrichir vos espaces
                  avec une qualité et un design sans pareil.
                </p>
              </motion.div>
              <motion.div variants={fadeInFromLeft}>
                <Link
                  to="/gallery"
                  className="site-button m-r10 m-b10 btnhover20"
                >
                  Voir Catalogue
                </Link>
                <Link
                  to="/about"
                  className="site-button black m-b10 btnhover20"
                >
                  A Propos
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default OurStory;