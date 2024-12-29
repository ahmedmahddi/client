import { ReactElement } from "react";


const BottomCTA = (): ReactElement =>{
    return (<div className="cta-banner-section">
        <div className="cta-content">
          <h2>Besoin d'une solution sur mesure en aluminium et PVC ?</h2>
          <p>
            Notre équipe d'experts est prête à concevoir et réaliser des
            installations adaptées à vos besoins spécifiques en construction et
            rénovation.
          </p>
          <a
            href="./contact.html"
            target="_blank"
            className="cta-button site-button btnhover20"
          >
            Obtenir un Devis
          </a>
        </div>

        <div className="background-animation">
          <div className="circles"></div>
          <div className="circles"></div>
          <div className="circles"></div>
          <div className="circles"></div>
        </div>
      </div>)
}

export default BottomCTA