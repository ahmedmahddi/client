import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

interface TrajectoryContent {
  title: string;
  description: string;
  catalogButton: string;
  aboutButton: string;
}

const content: TrajectoryContent = {
  title: "Notre Trajectoire d'Excellence",
  description: "Chez SOMATRAP, nous maîtrisons l'art de la menuiserie aluminium et PVC grâce à des décennies d'expertise. Nos matériaux et adhésifs sont choisis avec soin pour assurer durabilité, compatibilité et résistance optimale. Faites confiance à notre engagement envers la précision et l'innovation.",
  catalogButton: "Voir Catalogue",
  aboutButton: "A Propos"
};

const OurTrajectory: React.FC = () => {
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

  const variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="container"
      style={{ paddingBottom: "50px", paddingTop: "50px" }}
    >
      <div className="section-head style2 text-center">
        <h2 className="title" style={{ color: "#224067" }}>
          {content.title}
        </h2>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-10 col-sm-12">
          <div className="content-bx1 text-center">
            <p>{content.description}</p>
            <Link
              to="/gallery"
              className="site-button m-r10 m-b10 btnhover20"
            >
              {content.catalogButton}
            </Link>
            <Link to="/about" className="site-button black m-b10 btnhover20">
              {content.aboutButton}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OurTrajectory;
