import React, { useState } from "react";

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

interface CarouselItem {
  src: string;
  alt: string;
}

const ServicesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const services: ServiceItem[] = [
    {
      icon: "fa fa-industry",
      title: "Conception Sur Mesure",
      description: "Nous créons des solutions personnalisées en aluminium et PVC pour répondre précisément à vos spécifications de design et fonctionnalité.",
    },
    {
      icon: "fas fa-lightbulb",
      title: "Produit Innovation",
      description: "Découvrez comment nos innovations ouvrent la voie à des produits de menuiserie plus sûrs, plus écologiques et plus durables.",
    },
    {
      icon: "fas fa-tools",
      title: "Services d'Installation",
      description: "Profitez d'une installation experte avec une équipe spécialisée pour assurer la perfection à chaque étape du projet.",
    },
  ];

  const carouselItems: CarouselItem[] = [
    { src: "/images/Services/solution.webp", alt: "Solution" },
    { src: "/images/Services/consultation.webp", alt: "Consultation" },
    { src: "/images/Services/installation.webp", alt: "Installation" },
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="section-full box-about-list">
      <div className="row spno ">
        <div className="col-lg-6 col-md-12 bg-primary" >
          <div className="max-w700 m-auto p-tb50 p-lr20 ">
            <div className="text-white  m-t50">
              <h2>
                Nous innovons et améliorons constamment nos produits en
                menuiserie aluminium et PVC.
              </h2>
            </div>

            {services.map((service, index) => (
              <div key={index} className="icon-bx-wraper m-b30 left">
                <div className="icon-md">
                  <a href="./services.html" className="icon-cell text-white">
                    <i className={service.icon}></i>
                  </a>
                </div>
                <div className="icon-content">
                  <h4 className="dlab-tilte">{service.title}</h4>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-6 col-md-12" >
          <div className="carousel slide">

            <div className="carousel-inner">
              {carouselItems.map((item, index) => (
                <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
                  <img
                    src={item.src}
                    className="d-block w-100 img-cover"
                    alt={item.alt}
                  />
                </div>
              ))}
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              onClick={prevSlide}
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Précédent</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              onClick={nextSlide}
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Suivant</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
