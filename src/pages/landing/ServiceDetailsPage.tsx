import Banner from 'components/banner/banner';
import  { useEffect,ReactElement } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { productsData } from "data/productsData";
import type { ProductDetail } from "data/productsData";
import PageLoader from 'components/loading/PageLoader';



interface DownloadItem {
  text: string;
}

const ServiceDetailsPage = (): ReactElement => {
  const { id } = useParams();
  const navigate = useNavigate();
  const serviceDetails = id ? productsData[id] : null;

  useEffect(() => {
    if (!serviceDetails) {
      navigate("/services"); 
    }
  }, [serviceDetails, navigate]);

  if (!serviceDetails) {
    return <PageLoader />; 
  }

  const downloadItems: DownloadItem[] = [
    { text: 'Company Brochures' },
    { text: 'Company Info' }
  ];

  return (
    <div>
      <Banner title="Details sur les produits et services" />
      <div className="content-block">
        <div className="section-full content-inner section-bg-image bg-pattern-2">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-4 col-md-5">
                <div className="widget sidebar-widget ext-sidebar-menu widget_nav_menu">
                  <ul className="menu">
                    <li className=""><a href="/services">Tous les services</a></li>
                    {Object.values(productsData).map((product: ProductDetail) => (
                      <li key={product.id} className={product.id === id ? 'active' : ''}>
                        <a href={`/services/${product.id}`}>{product.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="widget">
                  <div className="download-file">
                    <h4 className="title">Get your brochures</h4>
                    <ul>
                      {downloadItems.map((item, index) => (
                        <li key={index}>
                          <a href="javascript:void(0);">
                            <div className="text">{item.text}</div>
                            <i className="fas fa-download"></i>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-8 col-md-7 m-b30">
                <div className="row">
                  <div className="col-lg-6 col-md-12 m-b30">
                    <div className="dlab-box">
                      <div className="dlab-media">
                        <img src={serviceDetails.image} alt={serviceDetails.title} />
                      </div>
                      <div className="dlab-info m-t30">
                        <h4 className="dlab-title m-t0">{serviceDetails.title}</h4>
                        <p>{serviceDetails.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="dlab-box">
                      <div className="specifications-section">
                        <h4 className="dlab-title m-t0">Spécifications Technique</h4>
                        <div className="row">
                          {serviceDetails.specifications.map((spec, index) => (
                            <div key={index} className="col-sm-6 m-b5 ">
                              <div className="spec-card">
                                <h5 className="spec-title">{spec.title}</h5>
                                <p className="spec-value">{spec.value}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="features-list m-t5">
                          <h5 className="dlab-title">Key Features</h5>
                          <ul className="list-unstyled">
                            {serviceDetails.features.map((feature, index) => (
                              <li key={index} className="feature-item">
                                <i className="fas fa-check-circle"></i>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;