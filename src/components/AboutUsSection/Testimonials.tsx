import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import 'swiper/css';
import 'swiper/css/pagination';

interface Testimonial {
  text: string;
  name: string;
  position: string;
}

const testimonialsData: Testimonial[] = [
  {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsuma has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
    name: "David Matin",
    position: "Student",
  },
  {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
    name: "Jane Doe",
    position: "Teacher",
  },
  {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
    name: "John Smith",
    position: "Engineer",
  },
];

const Testimonials: React.FC = () => {
  const repeatedTestimonials = [...testimonialsData, ...testimonialsData, ...testimonialsData];
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
        when: "beforeChildren",
        staggerChildren: 0.1,
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
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="section-full content-inner-2 section-bg-image bg-pattern-1"
      style={{ marginBottom: 0 }}
    >
      <div className="container">
        <motion.div variants={itemVariants} className="section-head text-black text-center">
          <h2 className="title" style={{ color: "#224067" }}>
            Happy Customers Said
          </h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry has been the industry's standard dummy text ever since the
            been when an unknown printer.
          </p>
        </motion.div>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 3,
            },
          }}
          loopAdditionalSlides={repeatedTestimonials.length}
          className="testimonial-six owl-loaded owl-theme owl-carousel owl-none dots-style-2"
        >
          {repeatedTestimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div variants={itemVariants} className="testimonial-8">
                <div className="testimonial-text">
                  <p>{testimonial.text}</p>
                </div>
                <div className="testimonial-detail clearfix">
                  <h5 className="testimonial-name m-t0 m-b5">
                    {testimonial.name}
                  </h5>
                  <span className="testimonial-position">
                    {testimonial.position}
                  </span>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.div>
  );
};

export default Testimonials;
