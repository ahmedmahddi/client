import React from "react";

interface BannerProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  backgroundImage = "/images/patterns/bg.jpeg",
}) => {
  return (
    <div
      className="dlab-bnr-inr overlay-black-middle text-center bg-pt"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div
          className="dlab-bnr-inr-entry align-m text-center"
          style={{
            display: "block",
            paddingTop: "180px",
            paddingBottom: "180px",
            paddingRight: "50px",
            paddingLeft: "50px",
          }}
        >
          <div className="text-white">
            <h1 style={{ color: "#224067" }}>{title}</h1>
            <p style={{ color: "#224067" }}>{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
