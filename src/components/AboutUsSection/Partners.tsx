import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion, useInView, useAnimation } from 'framer-motion';
import 'swiper/css';

interface PortfolioItem {
  image: string;
  title: string;
  link: string;
}

const PartnersItems: PortfolioItem[] = [
  {
    image: "/images/Gallery/door.webp",
    title: "Plastics Institute",
    link: "./Gallery.html",
  },
  {
    image: "/images/Gallery/fence.webp",
    title: "Institute of Packaging",
    link: "./Gallery.html",
  },
  {
    image: "/images/Gallery/shower.webp",
    title: "Merchant's Chamber",
    link: "./Gallery.html",
  },
  {
    image: "/images/Gallery/mur.webp",
    title: "Chemical Council",
    link: "./Gallery.html",
  },
  {
    image: "/images/Gallery/stairs.webp",
    title: "Plastics Institute",
    link: "./Gallery.html",
  },
  {
    image: "/images/Gallery/window.webp",
    title: "Institute of Packaging",
    link: "./Gallery.html",
  },
];

const Partners: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <motion.div 
      ref={ref}
      className="portfolio-carousel-container"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <Swiper
        className="portfolio-carousel-nogap"
        loop={true}
        spaceBetween={0}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        slidesPerView={4}
        breakpoints={{
          0: { slidesPerView: 2 },
          600: { slidesPerView: 3 },
          1000: { slidesPerView: 4 },
        }}
        modules={[Autoplay]}
      >
        {PartnersItems.map((item, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="item"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className="dlab-media dlab-img-overlay1 dlab-img-effect portbox1 style1"
                style={{ height: "180px", overflow: "hidden" }}
              >
                <motion.img
                  src={item.image}
                  alt={item.title}
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="overlay-bx"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="portinner">
                    <h3 className="port-title">
                      <a href={item.link}>{item.title}</a>
                    </h3>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default Partners;
