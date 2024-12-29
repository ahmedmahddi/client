// src/components/Services/ContactCTA.tsx

import React, { useState, ChangeEvent, FormEvent } from "react";

// Interface pour les données du formulaire
interface FormData {
  dzName: string;
  dzEmail: string;
  dzOther: {
    Phone: string;
    Subject: string;
    UploadFile?: string; // Champ optionnel pour le fichier téléchargé
  };
  dzMessage: string;
}

// Interface pour les champs du formulaire
interface FormField {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  iconClass: string;
}

const ContactCTA: React.FC = () => {
  // État pour les données du formulaire
  const [formData, setFormData] = useState<FormData>({
    dzName: "",
    dzEmail: "",
    dzOther: {
      Phone: "",
      Subject: "",
    },
    dzMessage: "",
  });

  // État pour le statut de soumission du formulaire
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string>("");

  // Définir les champs du formulaire
  const formFields: FormField[] = [
    {
      name: "dzName",
      type: "text",
      placeholder: "Prénom",
      required: true,
      iconClass: "ti-user text-primary",
    },
    {
      name: "dzOther[Phone]",
      type: "text",
      placeholder: "Téléphone",
      required: true,
      iconClass: "ti-mobile text-primary",
    },
    {
      name: "dzEmail",
      type: "email",
      placeholder: "Votre Adresse E-mail",
      required: true,
      iconClass: "ti-email text-primary",
    },
    {
      name: "dzOther[Subject]",
      type: "text",
      placeholder: "Sujet",
      required: true,
      iconClass: "ti-check-box text-primary",
    },
    {
      name: "dzOther[UploadFile]",
      type: "file",
      placeholder: "Télécharger un fichier",
      required: false, // Champ optionnel
      iconClass: "ti-file text-primary",
    },
    {
      name: "dzMessage",
      type: "textarea",
      placeholder: "Parlez-nous de votre projet ou idée",
      required: true,
      iconClass: "ti-agenda text-primary",
    },
  ];

  // Fonction d'assistance pour obtenir la valeur d'un champ
  const getFieldValue = (field: FormField): string => {
    if (field.name.startsWith("dzOther[")) {
      const key = field.name
        .split("[")[1]
        .split("]")[0] as keyof FormData["dzOther"];
      return formData.dzOther[key] ?? "";
    } else {
      return formData[field.name as keyof Omit<FormData, "dzOther">] ?? "";
    }
  };

  // Gérer les changements d'entrée
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.type === "file") {
      const fieldName = target.name
        .split("[")[1]
        .split("]")[0] as keyof FormData["dzOther"];
      const newValue = target.files?.[0]?.name ?? "";

      setFormData(prevData => ({
        ...prevData,
        dzOther: {
          ...prevData.dzOther,
          [fieldName]: newValue,
        },
      }));
    } else if (target instanceof HTMLInputElement) {
      const { name, value } = target;
      if (name.startsWith("dzOther[")) {
        const fieldName = name
          .split("[")[1]
          .split("]")[0] as keyof FormData["dzOther"];
        setFormData(prevData => ({
          ...prevData,
          dzOther: {
            ...prevData.dzOther,
            [fieldName]: value,
          },
        }));
      } else {
        setFormData(prevData => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else if (target instanceof HTMLTextAreaElement) {
      const { name, value } = target;
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Fonction d'assistance pour rendre un champ de formulaire
  const renderField = (field: FormField) => {
    const commonProps = {
      name: field.name,
      required: field.required,
      className: "form-control",
      placeholder: field.placeholder,
      onChange: handleChange,
    };

    if (field.type === "textarea") {
      return (
        <textarea
          {...commonProps}
          rows={4}
          value={formData.dzMessage}
        ></textarea>
      );
    } else if (field.type === "file") {
      return <input {...commonProps} type="file" />;
    } else {
      return (
        <input
          {...commonProps}
          type={field.type}
          value={getFieldValue(field)}
        />
      );
    }
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
        dzName: formData.dzName,
        dzEmail: formData.dzEmail,
        dzOther: {
          Phone: formData.dzOther.Phone,
          Subject: formData.dzOther.Subject,
          UploadFile: formData.dzOther.UploadFile ?? "",
        },
        dzMessage: formData.dzMessage,
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
          dzName: "",
          dzEmail: "",
          dzOther: {
            Phone: "",
            Subject: "",
          },
          dzMessage: "",
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

  return (
    <div
      className="section-full overlay-black-middle bg-img-fix"
      style={{ backgroundImage: "url(/images/background/ctabanner.jpg)" }}
    >
      <div className="container">
        <div className="row">
          {/* Partie Gauche : Contenu CTA */}
          <div className="col-lg-5 col-md-12 content-inner chosesus-content text-white">
            <h2
              className="title-box font-weight-300 m-b15 wow fadeInLeft"
              data-wow-delay="0.2s"
            >
              Entrons en contact <span className="bg-primary"></span>
            </h2>
            <p className="font-16 op8 wow fadeInLeft" data-wow-delay="0.4s">
              Appelez-nous ou passez nous voir à tout moment, nous nous
              efforçons de répondre à toutes les demandes dans les 24 heures les
              jours ouvrables.
            </p>
            <h3
              className="font-weight-300 m-b50 op6 wow fadeInLeft"
              data-wow-delay="0.6s"
            >
              Plus de 700 clients satisfaits pour plus de 3200 projets de
              menuiserie en aluminium et PVC.
            </h3>
            <h4
              className="font-weight-300 wow fadeInLeft"
              data-wow-delay="0.8s"
            >
              Et ce que vous obtiendrez :
            </h4>
            <ul
              className="list-checked primary wow fadeInLeft"
              data-wow-delay="1s"
            >
              <li>
                <span>
                  Nos fenêtres en aluminium offrent durabilité et élégance
                </span>
              </li>
              <li>
                <span>
                  Les portes en PVC assurent une isolation thermique optimale
                </span>
              </li>
              <li>
                <span>
                  Installation rapide et service après-vente de qualité
                </span>
              </li>
            </ul>
          </div>

          {/* Partie Droite : Formulaire de Contact */}
          <div className="col-lg-7 col-md-12 m-b30">
            <form
              className="inquiry-form contact-project bg-white box-shadow wow fadeInUp"
              data-wow-delay="0.2s"
              style={{
                marginTop: "-30px",
                marginLeft: "20px",
                marginBottom: "10px",
                marginRight: "20px",
              }}
              onSubmit={handleSubmit}
            >
              <h3 className="title-box font-weight-300 m-t0 m-b10">
                Transformez votre idée en réalité{" "}
                <span className="bg-primary"></span>
              </h3>
              <p>
                Nous sommes spécialisés dans la menuiserie aluminium et PVC,
                offrant des solutions sur mesure pour tous vos besoins en
                construction et rénovation.
              </p>
              <div className="row">
                {formFields.map(field => {
                  // Définir les classes de colonne en fonction du type de champ
                  let colClass = "col-lg-6 col-sm-6";
                  if (field.type === "textarea" || field.name === "dzMessage") {
                    colClass = "col-lg-12 col-sm-12";
                  }

                  return (
                    <div key={field.name} className={colClass}>
                      <div className="form-group">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i className={field.iconClass}></i>
                          </span>
                          {renderField(field)}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Bouton de Soumission */}
                <div className="col-lg-12 col-sm-12">
                  <button
                    name="submit"
                    type="submit"
                    value="Submit"
                    className="site-button btnhover20 button-lg"
                    disabled={isSubmitting}
                  >
                    <span>
                      {isSubmitting
                        ? "Envoi en cours..."
                        : "Obtenir un devis gratuit !"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Afficher le statut de la soumission */}
              {submitStatus && (
                <div className="alert alert-info mt-3" role="alert">
                  {submitStatus}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCTA;
