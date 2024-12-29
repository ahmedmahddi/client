import { ReactElement } from "react";
import TopCTA from "components/content/topCTA";

import OurStory from "components/content/ourStory";
import ServicesHead from "components/content/servicesHead";
import ServicesSlider from "components/content/servicesSlider";
import Gallery from "components/content/gallery";
import ProcessSwiper from "components/content/process";
import BottomCTA from "components/content/botCTA";
import Blog from "components/content/blog";
import HeroSlider from "components/HeroSlider/HeroSlider";

// Array of available displacement maps
const displacementMaps = [
  "/images/Displacements/1.jpg",
  "/images/Displacements/2.jpg",
  "/images/Displacements/3.jpg",
  "/images/Displacements/4.png",
  "/images/Displacements/5.png",
  "/images/Displacements/6.jpg",
  "/images/Displacements/7.jpg",
  "/images/Displacements/8.jpg",
  "/images/Displacements/9.jpg",
  "/images/Displacements/10.jpg",
  "/images/Displacements/11.jpg",
  "/images/Displacements/12.jpg",
  "/images/Displacements/13.jpg",
  "/images/Displacements/14.jpg",
  "/images/Displacements/15.jpg",
  "/images/Displacements/16.jpg",
  "/images/Displacements/17.jpg",
  "/images/Displacements/18.jpg",
  "/images/Displacements/19.jpg",
  "/images/Displacements/20.png",
];

// Function to get a random displacement map
const getRandomDisplacement = () => {
  const randomIndex = Math.floor(Math.random() * displacementMaps.length);
  return displacementMaps[randomIndex];
};

const baseSlides = [
  {
    imageUrl: "/images/Slider/doors1.jpg",
    title: "Votre Projet, Notre Priorité",
    description: "Découvrez comment nos solutions de menuiserie aluminium et PVC, conçues sur mesure, peuvent concrétiser vos idées. Nous sommes à vos côtés à chaque étape pour vous offrir la qualité et l’accompagnement que vous méritez.",
    buttonText: "En savoir plus",
    buttonLink: "/services",
    effect: {
      intensity: 0.7,
      duration: 2000,
      transitionDuration: 1.5,
    },
  },
  {
    imageUrl: "/images/Slider/window1.jpg",
    title: "Découvrez Nos Réalisations : Garantie de Qualité",
    description: "Parcourez notre sélection de projets en aluminium et PVC pour constater la qualité de notre savoir-faire. Laissez-vous inspirer et imaginez déjà votre propre transformation.",
    buttonText: "En savoir plus",
    buttonLink: "/portfolio",
    effect: {
      intensity: 0.8,
      duration: 2000,
      transitionDuration: 1.5,
    },
  },
  {
    imageUrl: "/images/Slider/shower1.jpg",
    title: "Qui Sommes-Nous ? Apprenez à Nous Connaître",
    description: "Découvrez l’histoire de notre entreprise, nos valeurs et l’équipe passionnée qui se cache derrière chaque réalisation. Votre confiance est au cœur de notre engagement.",
    buttonText: "En savoir plus",
    buttonLink: "/about",
    effect: {
      intensity: 0.6,
      duration: 2000,
      transitionDuration: 1.5,
    },
  },
  {
    imageUrl: "/images/Slider/office.jpg",
    title: "Parlons de Vos Idées",
    description: "Prêt à faire passer votre projet à l’étape suivante ? Contactez-nous dès maintenant et bénéficiez de nos conseils personnalisés pour donner vie à vos envies.",
    buttonText: "Contactez Nous",
    buttonLink: "/contact",
    effect: {
      intensity: 0.7,
      duration: 2000,
      transitionDuration: 1.5,
    },
  },
  {
    imageUrl: "/images/Slider/stairs1.jpg",
    title: "Inspirez-Vous",
    description: "Retrouvez nos meilleurs conseils, idées et astuces pour améliorer votre maison grâce à la menuiserie aluminium et PVC. Faites le plein d’inspiration pour un intérieur qui vous ressemble.",
    buttonText: "En savoir plus",
    buttonLink: "/gallery",
    effect: {
      intensity: 0.8,
      duration: 2000,
      transitionDuration: 1.5,
    },
  },
];

const LandingPage = (): ReactElement => {
  // Generate slides with random displacement maps
  const slides = baseSlides.map((slide) => ({
    ...slide,
    effect: {
      ...slide.effect,
      displacementMap: getRandomDisplacement(),
    },
  }));

  console.log("Slides data:", slides);
  return (
    <div style={{ overflow: "hidden" }}>
      <HeroSlider slides={slides} />
      <TopCTA />
      <OurStory />
      <ServicesHead />
      <ServicesSlider />
      <Gallery />
      <ProcessSwiper />
      <BottomCTA />
      <Blog />
    </div>
  );
};

export default LandingPage;
