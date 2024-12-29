import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./services.css";

type ProjectCardColor = "blue" | "red" | "green" | "custom";

interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  tags: string[];
  color: ProjectCardColor;
  customColor?: string;
  index: number;
}

interface ProjectCardsContainerProps {
  cards: Omit<ProjectCardProps, 'index'>[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  tags,
  color,
  customColor,
  index,
}) => {
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

  const getCardColorClass = () => {
    if (color === "custom") {
      return "projcard-customcolor";
    }
    return `projcard-${color}`;
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
      }}
      transition={{ duration: 0.5 }}
      className={`projcard ${getCardColorClass()}`}
      style={
        color === "custom"
          ? ({ "--projcard-color": customColor } as React.CSSProperties)
          : {}
      }
    >
      <div className="projcard-innerbox">
        <img className="projcard-img" src={imageUrl} alt={title} />
        <div className="projcard-textbox">
          <div className="projcard-title">{title}</div>
          <div className="projcard-subtitle">{subtitle}</div>
          <div className="projcard-bar"></div>
          <div className="projcard-description">{description}</div>
          <div className="projcard-tagbox">
            {tags.map((tag, index) => (
              <span key={index} className="projcard-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCardsContainer: React.FC<ProjectCardsContainerProps> = ({
  cards,
}) => {
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

  return (
    <div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 },
        }}
        transition={{ duration: 0.5 }}
        className="container"
      >
        <div
          className="section-head text-white text-center"
          style={{ marginBottom: "30px" }}
        >
          <h2 className="title text-primary">
            Solutions Innovantes en Menuiserie Aluminium et PVC
            <span className="bg-primary"></span>
          </h2>
          <p className="text-black">
            Nous fournissons des solutions complètes et économiques pour la
            menuiserie sur mesure en aluminium et PVC, adaptées à tous vos
            besoins en construction et rénovation.
          </p>
        </div>
      </motion.div>
      <div className="projcard-container">
        {cards.map((card, index) => (
          <ProjectCard key={index} {...card} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ProjectCardsContainer;
