import { ReactElement } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';

const Gallery = (): ReactElement => {
  const slides = [
    { image: "/images/Gallery/door.webp", title: "Porte" },
    { image: "/images/Gallery/fence.webp", title: "Fence" },
    { image: "/images/Gallery/shower.webp", title: "Douche" },
    { image: "/images/Gallery/mur.webp", title: "Mur" },
    { image: "/images/Gallery/stairs.webp", title: "Garde Corps" },
    { image: "/images/Gallery/window.webp", title: "Fenetre" },
  ];

  return (
    <div className="portfolio-carousel-nogap owl-carousel owl-none owl-loaded owl-drag">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,

          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="item"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="dlab-media dlab-img-overlay5 dlab-img-effect portbox1 style1">
                <img src={slide.image} alt={slide.title} className="w-full h-auto" />
                <div className="overlay-bx">
                  <div className="portinner">
                    <h3 className="port-title">
                      <a href="./gallery.html">{slide.title}</a>
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Gallery;