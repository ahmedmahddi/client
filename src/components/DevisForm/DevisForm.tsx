import React, { useState } from 'react';
import './DevisForm.css';
import { useNavigate } from 'react-router-dom';
import { productsData } from 'data/productsData';

const DevisForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    projectType: '',
    otherProjectType: '',
    estimateBudget: '',
    maxTimeProject: '',
    companyName: '',
    country: '',
    message: '',
    file: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        file: e.target.files[0]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="devis-form-container">
      <form onSubmit={handleSubmit} className="devis-form">
        <div className="d-flex justify-content-between align-items-center">
          <button onClick={handleBack} className="site-button btnhover20 text-white d-md-none">
            <i className="fas fa-arrow-left"></i> Retour
          </button>
          <button onClick={handleBack} className="site-button btnhover20 text-white d-none d-md-block">
            <i className="fas fa-arrow-left"></i> Retour
          </button>
        </div>
        <h1 className='text-primary'>Demande de Devis</h1>
        <p className="form-description text-primary">
          Spécialiste en menuiserie aluminium et PVC, nous vous proposons des solutions sur mesure pour vos projets. 
          Remplissez ce formulaire pour recevoir un devis personnalisé.
        </p>
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              placeholder="Prénom"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              placeholder="Nom"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Numéro de téléphone"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
            >
              <option value="">Type de produit</option>
              {Object.values(productsData).map((product) => (
                <option key={product.id} value={product.id}>
                  {product.title}
                </option>
              ))}
              <option value="autre">Autre</option>
            </select>
          </div>
          {formData.projectType === 'autre' && (
            <div className="form-group">
              <input
                type="text"
                name="otherProjectType"
                placeholder="Précisez le service souhaité"
                value={formData.otherProjectType}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="form-group">
            <input
              type="text"
              name="estimateBudget"
              placeholder="Budget estimé"
              value={formData.estimateBudget}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="maxTimeProject"
              placeholder="Délai souhaité"
              value={formData.maxTimeProject}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="companyName"
              placeholder="Nom de l'entreprise (optionnel)"
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            >
              <option value="">Gouvernorat</option>
              <option value="Ariana">Ariana</option>
              <option value="Béja">Béja</option>
              <option value="Ben Arous">Ben Arous</option>
              <option value="Bizerte">Bizerte</option>
              <option value="Gabès">Gabès</option>
              <option value="Gafsa">Gafsa</option>
              <option value="Jendouba">Jendouba</option>
              <option value="Kairouan">Kairouan</option>
              <option value="Kasserine">Kasserine</option>
              <option value="Kébili">Kébili</option>
              <option value="Le Kef">Kef</option>
              <option value="Mahdia">Mahdia</option>
              <option value="La Manouba">Manouba</option>
              <option value="Médenine">Médenine</option>
              <option value="Monastir">Monastir</option>
              <option value="Nabeul">Nabeul</option>
              <option value="Sfax">Sfax</option>
              <option value="Sidi Bouzid">Sidi Bouzid</option>
              <option value="Siliana">Siliana</option>
              <option value="Sousse">Sousse</option>
              <option value="Tataouine">Tataouine</option>
              <option value="Tozeur">Tozeur</option>
              <option value="Tunis">Tunis</option>
              <option value="Zaghouan">Zaghouan</option>
            </select>
          </div>
        </div>
        <div className="form-group file-upload">
          <div className="upload-box">
            <p>Déposez votre fichier ici ou cliquez sur le bouton ci-dessous (optionnel)</p>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              id="file-upload"
            />
            <label htmlFor="file-upload" className="upload-btn site-button btnhover20">Télécharger un fichier</label>
          </div>
        </div>
        <div className="form-group">
          <textarea
            name="message"
            placeholder="Message ou détails supplémentaires"
            value={formData.message}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="site-button btnhover20" style={{width:"100%"}}>Demander un devis</button>
      </form>
    </div>
  );
};

export default DevisForm;
