import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUsers, faCog, faChartLine } from "@fortawesome/free-solid-svg-icons";

const CompanyStats: React.FC = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    const animate = (target: number, setter: React.Dispatch<React.SetStateAction<number>>) => {
      let current = 0;
      const increment = target / steps;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, stepTime);
    };

    animate(15, setCount1);
    animate(700, setCount2);
    animate(50, setCount3);
    animate(200, setCount4);
  }, []);

  return (
    <div className="choses-info bg-custom text-white">
      <div className="container-fluid">
        <div className="row choses-info-content">
          <div
            className="col-lg-3 col-md-6 col-sm-6 col-6 p-a30 wow zoomIn"
            data-wow-delay="0.2s"
          >
            <h2 className="m-t0 m-b10 font-weight-400 font-45">
              <FontAwesomeIcon icon={faClock} className="m-r10" />
              <span>{count1}</span>+
            </h2>
            <h4 className="font-weight-300 m-t0">Years in Business</h4>
          </div>
          <div
            className="col-lg-3 col-md-6 col-sm-6 col-6 p-a30 wow zoomIn"
            data-wow-delay="0.4s"
          >
            <h2 className="m-t0 m-b10 font-weight-400 font-45">
              <FontAwesomeIcon icon={faUsers} className="m-r10" />
              <span>{count2}</span>+
            </h2>
            <h4 className="font-weight-300 m-t0">Happy Clients</h4>
          </div>
          <div
            className="col-lg-3 col-md-6 col-sm-6 col-6 p-a30 wow zoomIn"
            data-wow-delay="0.6s"
          >
            <h2 className="m-t0 m-b10 font-weight-400 font-45">
              <FontAwesomeIcon icon={faCog} className="m-r10" />
              <span>{count3}</span>+
            </h2>
            <h4 className="font-weight-300 m-t0">Technical Experts</h4>
          </div>
          <div
            className="col-lg-3 col-md-6 col-sm-6 col-6 p-a30 wow zoomIn"
            data-wow-delay="0.8s"
          >
            <h2 className="m-t0 m-b10 font-weight-400 font-45">
              <FontAwesomeIcon icon={faChartLine} className="m-r10" />
              <span>{count4}</span>+
            </h2>
            <h4 className="font-weight-300 m-t0">Apps Delivered</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyStats;
