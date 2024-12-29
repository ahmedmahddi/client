import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

interface ProductCardProps {
  image: string;
  icon: string;
  title: string;
  description: string;
  id: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  icon,
  title,
  description,
  id,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className="col-lg-4 col-md-6 col-sm-12 m-b30"
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.5 }}
    >
      <div className="dlab-box service-box-5">
        <div className="dlab-media radius-sm custom-overlay">
          <Link to={`/services/${id}`}>
            <img src={image} alt={title} style={{ objectFit: "cover", height:"375px", width:"375px" }} />
          </Link>
        </div>
        <div className="dlab-info">
          <div
            className="icon-bx-sm icon-bx bg-icon icon-up"
            style={{ backgroundColor: "#759BCD" }}
          >
            <Link to={`/services/${id}`} className="icon-cell">
              <img src={icon} alt={title} />
            </Link>
          </div>
          <h4 className="title">
            <Link to={`/services/${id}`}>{title}</Link>
          </h4>
          <p>{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Products: React.FC = () => {
  const products = [
    {
      id: "menuiseries-coulissantes",
      image: "/images/window1.jpg",
      icon: "/images/icon/sliding-door.png",
      title: "Menuiseries coulissantes",
      description:
        "portes et fenêtres offrant une isolation performante et un design moderne.",
    },
    {
      id: "murs-rideaux",
      image: "/images/mur-rideaux.jpg",
      icon: "/images/icon/window.png",
      title: "Murs rideaux",
      description:
        "solutions architecturales pour des façades vitrées élégantes.",
    },
    {
      id: "volets-roulants",
      image: "/images/volet-roulant.jpg",
      icon: "/images/icon/garage.png",
      title: "Volets roulants",
      description: "systèmes de protection solaire et de sécurité.",
    },
    {
      id: "garde-corps",
      image: "/images/garde-corp.jpg",
      icon: "/images/icon/stairs.png",
      title: "Garde-corps",
      description: "éléments de sécurité alliant robustesse et design.",
    },
    {
      id: "cabines-douche",
      image: "/images/douche2.jpg",
      icon: "/images/icon/shower.png",
      title: "Cabines de douche",
      description: "Solutions modernes et élégantes pour cabines de douches.",
    },
    {
      id: "alucobond",
      image: "/images/alucobond.jpeg",
      icon: "/images/icon/frame.png",
      title: "Alucobond",
      description:
        "panneaux composites en aluminium pour l'habillage de façades.",
    },
  ];

  return (
    <div className="container" style={{ paddingBottom: "40px", paddingTop:"40px" }}>
      <div className="section-head text-black text-center">
        <h2 className="title" style={{ color: " #224067" }}>
          Nos Produits
        </h2>
        <p style={{ fontWeight: "normal" }}>
          Transformez vos intérieurs et extérieurs avec des produits
          fonctionnels et élégants.
        </p>
      </div>
      <div className="row" style={{marginLeft:"0px"}}>
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
