// src/components/ContactSection.tsx

import React, { useState, ChangeEvent, FormEvent } from "react";

// Définir la forme des données du formulaire
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// Définir la forme des informations de contact
interface ContactInfo {
  iconClass: string;
  title: string;
  content: React.ReactNode;
}

const ContactSection: React.FC = () => {
  // État pour les données du formulaire
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // État pour le statut de soumission du formulaire
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string>("");

  // Gérer les changements d'entrée
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // Préparer les données du formulaire à envoyer
      const payload = {
        dzToDo: "Contact",
        dzName: formData.name,
        dzEmail: formData.email,
        dzOther: {
          Phone: formData.phone,
          Subject: formData.subject,
        },
        dzMessage: formData.message,
      };

      // Envoyer une requête POST à votre backend (remplacez par votre véritable endpoint)
      const response = await fetch("/script/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus("Votre message a été envoyé avec succès !");
        // Réinitialiser le formulaire
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus(
          "Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer."
        );
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
      setSubmitStatus(
        "Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Définir les informations de contact dynamiquement
  const contactInfos: ContactInfo[] = [
    {
      iconClass: "ti-location-pin",
      title: "Adresse",
      content: (
        <p style={{ color: "#224067" }}>MMHR+487, Unnamed Road, Thyna</p>
      ),
    },
    {
      iconClass: "ti-email",
      title: "E-mail",
      content: (
        <>
          <a href="mailto:info@example.com">Somatrap39@gmail.com</a>
        </>
      ),
    },
    {
      iconClass: "ti-mobile",
      title: "Téléphone",
      content: (
        <>
          <a href="tel: +216 21 885 276">+216 21 885 276</a>
        </>
      ),
    },
    {
      iconClass: "ti-facebook",
      title: "réseaux sociaux",
      content: (
        <>
          <a href="https://www.facebook.com/people/Somatrap/100063675905069/">
            Consultez notre page
          </a>
        </>
      ),
    },
  ];

  // Définir l'URL de la carte Google dynamiquement
  const googleMapSrc =
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d44144.210609859656!2d10.681034079662314!3d34.67898827651765!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13002beb320d7dc3%3A0xb7fa1d8a18c683cb!2sSomatrap%20Sfax!5e0!3m2!1sen!2stn!4v1733825229663!5m2!1sen!2stn";

  return (
    <div
      className="page-content section-bg-image bg-pattern-2"
      style={{ marginTop: "-30px" }}
    >
      {/* Zone de contact */}
      <div className="section-full content-inner bg-white contact-style-1">
        <div className="container">
          {/* Grille des informations de contact */}
          <div className="row dzseth">
            {contactInfos.map((info, index) => (
              <div key={index} className="col-lg-3 col-md-6 col-sm-6 m-b30">
                <div className="icon-bx-wraper bx-style-1 p-lr20 p-tb30 center seth radius-sm">
                  <div className="icon-lg text-primary m-b20">
                    <a href="#" className="icon-cell">
                      <i className={info.iconClass}></i>
                    </a>
                  </div>
                  <div className="icon-content">
                    <h5 className="dlab-title text-uppercase">{info.title}</h5>
                    {info.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Formulaire de contact et carte */}
          <div className="row">
            {/* Partie gauche : Formulaire de contact */}
            <div className="col-lg-6 m-b30">
              <div className="p-a30 bg-gray clearfix radius-sm">
                <h3>Envoyer un message</h3>
                {/* Afficher le statut de la soumission */}
                {submitStatus && (
                  <div className="alert alert-info" role="alert">
                    {submitStatus}
                  </div>
                )}
                <form className="dzForm" onSubmit={handleSubmit}>
                  <input type="hidden" value="Contact" name="dzToDo" />
                  <div className="row">
                    {/* Nom */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            name="name"
                            type="text"
                            required
                            className="form-control"
                            placeholder="Votre Nom"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    {/* E-mail */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            name="email"
                            type="email"
                            className="form-control"
                            required
                            placeholder="Votre Adresse E-mail"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Téléphone */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            name="phone"
                            type="text"
                            required
                            className="form-control dz-number"
                            placeholder="Téléphone"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Sujet */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            name="subject"
                            type="text"
                            required
                            className="form-control"
                            placeholder="Sujet"
                            value={formData.subject}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Message */}
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="input-group">
                          <textarea
                            name="message"
                            rows={4}
                            className="form-control"
                            required
                            placeholder="Votre Message..."
                            value={formData.message}
                            onChange={handleChange}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    {/* Bouton de soumission */}
                    <div className="col-md-12">
                      <button
                        name="submit"
                        type="submit"
                        className="site-button btnhover20 "
                        disabled={isSubmitting}
                      >
                        <span>
                          {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* Partie droite : Carte Google */}
            <div className="col-lg-6 m-b30 d-flex">
              <iframe
                src={googleMapSrc}
                width="600"
                height="450"
                className="align-self-stretch radius-sm"
                style={{ border: 0, width: "100%", minHeight: "100%" }}
                allowFullScreen
                loading="lazy"
                title="Carte Google"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
