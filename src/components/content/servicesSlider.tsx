import { ReactElement, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import 'swiper/css';
import { Link } from "react-router-dom";

interface ServiceItem {
  image: string;
  title: string;
  description: string;
}

const ServicesSlider = (): ReactElement => {
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
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.3 } 
    }
  };

  const sectionContent = {
    title: "Solutions Innovantes en Menuiserie Aluminium et PVC",
    description: "Nous fournissons des solutions complètes et économiques pour la menuiserie sur mesure en aluminium et PVC, adaptées à tous vos besoins en construction et rénovation.",
    backgroundImage: "/images/patterns/bg-pattern.png",
    ctaText: "En savoir plus",
    ctaLink: "/services"
  };

  const serviceItems: ServiceItem[] = [
    {
      image: "/images/Services/fabrication.webp",
      title: "Menuiserie Aluminium",
      description: "Fabrication pour toutes applications résidentielles et industrielles."
    },
    {
      image: "/images/Services/solution.webp",
      title: "Solutions sur Mesure",
      description: "Création personnalisée de fenêtres et portes selon les besoins clients."
    },
    {
      image: "/images/Services/installation.webp",
      title: "Services d'Installation",
      description: "Installation professionnelle avec focus sur performance et sécurité."
    },
    {
      image: "/images/Services/maintenance.webp",
      title: "Maintenance et Réparation",
      description: "Entretien régulier des installations en aluminium et PVC."
    },
    {
      image: "/images/Services/consultation.webp",
      title: "Etude de projet",
      description: "Accompagnement expert et gestion de projet du début à la fin."
    }
  ];

  return (
    <motion.div
      ref={ref}
      className="section-full content-inner-2 section-bg-image bg-pattern-2"
      id="about-us"
      style={{
        backgroundImage: `url('${sectionContent.backgroundImage}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: "20px 0",
        position: 'relative',
      }}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="container">
        <motion.div className="section-head text-black text-center" variants={itemVariants}>
          <h2 className="title" style={{ color: "#224067" }}>{sectionContent.title}</h2>
          <p>{sectionContent.description}</p>
        </motion.div>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          speed={1000}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
            1280:{
              slidesPerView: 4,
            }
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          loopAdditionalSlides={serviceItems.length}
          className="img-carousel owl-carousel owl-theme owl-none owl-dots-black-big service-box-4-area owl-dots-none owl-btn-center-lr owl-loade m-b30 owl-loaded owl-drag"
        >
          {[...serviceItems, ...serviceItems].map((item, index) => (
            <SwiperSlide key={index} style={{ transition: 'all 3s translate3d(0px,0,0)' }}>
              <motion.div className="service-box-4 text-center" variants={itemVariants}>
                <div className="service-images m-b15">
                  <img src={item.image} alt="" />
                </div>
                <div className="service-content">
                  <h6 className="title" style={{fontWeight:"600"}}>
                    <a href={sectionContent.ctaLink} style={{ color: "#224067"}}>{item.title}</a>
                  </h6>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        <motion.div className="text-center" variants={itemVariants}>
          <Link 
            to={sectionContent.ctaLink}
            className="site-button btnhover20 button-md"
          >
            {sectionContent.ctaText}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ServicesSlider;