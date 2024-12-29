import { ReactElement } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'styles/process.css';
import { Link } from "react-router-dom";

interface ProcessStep {
  title: string;
  fullTitle: string;
  image: string;
}

const processSteps: ProcessStep[] = [
  {
    title: "Prise de Contact",
    fullTitle: "Prise de Contact et<br/>Consultation",
    image: "/images/Process/contact.jpeg",
  },
  {
    title: "Étude et Conception",
    fullTitle: "Étude et<br/>Conception",
    image: "/images/Process/conception.jpeg",
  },
  {
    title: "Fabrication",
    fullTitle: "Fabrication<br/>Sur Mesure",
    image: "/images/Process/fabrication.jpeg",
  },
  {
    title: "Installation",
    fullTitle: "Installation<br/>Professionnelle",
    image: "/images/Process/installation.jpeg",
  },
  {
    title: "Formation",
    fullTitle: "Formation et<br/>Livraison",
    image: "/images/Process/formation.png",
  },
  {
    title: "Maintenance",
    fullTitle: "Suivi et<br/>Maintenance",
    image: "/images/Process/maintenance.jpeg",
  },
];

const ProcessSwiper = (): ReactElement => {
  return (
    <div className="dz-oil-industry-zone section-bg-image bg-pattern-3">
      <div className="container-fluid">
        <div className="dz-banner-top">
          <div className="row justify-content-between">
            <div
              className="col-lg-6 wow fadeIn"
              data-wow-duration="2s"
              data-wow-delay="0.2s"
            >
              <h1 className="dz-title fw-bold position-relative">
                Notre Processus de Service
              </h1>
            </div>
            <div
              className="col-lg-4 wow fadeIn"
              data-wow-duration="2s"
              data-wow-delay="0.2s"
            >
              <p>
                Nous offrons une expérience sans faille du premier contact au
                support continu.
              </p>
              <div className="dz-banner-btn d-flex align-items-center">
                <Link
                  to="/contact"
                  className="btn site-button bg-primary m-0 text-decoration-none btnhover20"
                >
                  Contactez-Nous
                </Link>
                <Link
                  to="/services"
                >
                  En Savoir Plus
                  <svg
                    width="40"
                    height="41"
                    viewBox="0 0 40 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.75002 19.8548C8.75002 19.5126 8.88172 19.1844 9.11614 18.9424C9.35056 18.7004 9.6685 18.5645 10 18.5645L26.9875 18.5645L25.3625 16.9C25.1271 16.657 24.9949 16.3275 24.9949 15.9838C24.9949 15.6402 25.1271 15.3107 25.3625 15.0677C25.5979 14.8247 25.9171 14.6882 26.25 14.6882C26.5829 14.6882 26.9021 14.8247 27.1375 15.0677L30.8875 18.9387C31.061 19.1201 31.1785 19.3506 31.2252 19.6009C31.2719 19.8512 31.2457 20.1102 31.15 20.3451C31.0562 20.5808 30.897 20.7825 30.6924 20.9249C30.4877 21.0672 30.2468 21.1439 30 21.1451L10 21.1451C9.6685 21.1451 9.35056 21.0092 9.11614 20.7672C8.88172 20.5252 8.75002 20.197 8.75002 19.8548Z"
                      fill="#1F1F1F"
                    />
                    <path
                      d="M25 23.7258C24.9991 23.556 25.0306 23.3876 25.0928 23.2304C25.155 23.0732 25.2467 22.9302 25.3625 22.8097L29.1125 18.9387C29.3479 18.6957 29.6671 18.5592 30 18.5592C30.1648 18.5592 30.3281 18.5927 30.4803 18.6578C30.6326 18.723 30.771 18.8184 30.8875 18.9387C31.0041 19.059 31.0965 19.2018 31.1596 19.359C31.2227 19.5162 31.2551 19.6847 31.2551 19.8548C31.2551 20.1984 31.1229 20.528 30.8875 20.771L27.1375 24.6419C27.0213 24.7629 26.8831 24.8589 26.7307 24.9244C26.5784 24.9899 26.415 25.0236 26.25 25.0236C26.085 25.0236 25.9216 24.9899 25.7693 24.9244C25.617 24.8589 25.4787 24.7629 25.3625 24.6419C25.2467 24.5213 25.155 24.3784 25.0928 24.2212C25.0306 24.0639 24.9991 23.8956 25 23.7258Z"
                      fill="#1F1F1F"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="dz-banner-bottom position-relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 4,
              }
            }}
          >
            {processSteps.map((step, index) => (
              <SwiperSlide key={`process-step-${index}`}>
                <motion.div
                  className="box-hover"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div
                    className="dz-banner-media position-relative"
                    style={{
                      backgroundImage: `url(${step.image})`,
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="dz-media-content position-absolute">
                      <h3 className="m-0">{step.title}</h3>
                    </div>
                    <div className="dz-media-content2 d-flex align-items-center justify-content-between position-absolute">
                      <h2
                        className="fw-bold m-0"
                        dangerouslySetInnerHTML={{ __html: step.fullTitle }}
                      />
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}

          </Swiper>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSwiper;