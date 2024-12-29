import { ReactElement } from "react";

const Footer = (): ReactElement => {
  return (
    <footer className="site-footer text-uppercase bgpt1">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            {/* Company Section */}
            <div className="col-md-3 col-5 col-xl-2 col-lg-2 col-sm-6 footer-col-4">
              <div className="widget widget_services border-0">
                <h5 className="m-b30 text-white">Company</h5>
                <ul>
                  <li>
                    <a href="index.html">About Us</a>
                  </li>
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li>
                    <a href="contact.html">Contact Us</a>
                  </li>
                  <li>
                    <a href="about-1.html">About Us</a>
                  </li>
                  <li>
                    <a href="services-2.html">Our Services</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Useful Links Section */}
            <div className="col-md-3 col-7 col-xl-2 col-lg-3 col-sm-6 footer-col-4">
              <div className="widget widget_services border-0">
                <h5 className="m-b30 text-white">Useful Link</h5>
                <ul>
                  <li>
                    <a href="index.html">Create Account</a>
                  </li>
                  <li>
                    <a href="index.html">Company Philosophy</a>
                  </li>
                  <li>
                    <a href="contact.html">Corporate Culture</a>
                  </li>
                  <li>
                    <a href="about-1.html">Portfolio</a>
                  </li>
                  <li>
                    <a href="services-2.html">Client Management</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Us Section */}
            <div className="col-md-6 col-xl-4 col-lg-3 col-sm-6 footer-col-4">
              <div className="widget widget_getintuch">
                <h5 className="m-b30 text-white">Contact us</h5>
                <ul>
                  <li>
                    <i className="ti-location-pin"></i>
                    <strong>address:</strong> demo address #8901 Marmora Road
                    Chi Minh City, Vietnam
                  </li>
                  <li>
                    <i className="ti-mobile"></i>
                    <strong>phone:</strong> 0800-123456 (24/7 Support Line)
                  </li>
                  <li>
                    <i className="ti-email"></i>
                    <strong>email:</strong> info@example.com
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="col-md-12 col-xl-4 col-lg-4 col-sm-6 footer-col-4">
              <div className="widget">
                <h5 className="m-b30 text-white">
                  Subscribe To Our Newsletter
                </h5>
                <p className="text-capitalize m-b20">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry has been the industry's standard dummy
                  text ever since the..
                </p>
                <div className="subscribe-form m-b20">
                  <form
                    className="dzSubscribe"
                    action="script/mailchamp.php"
                    method="post"
                  >
                    <div className="dzSubscribeMsg"></div>
                    <div className="input-group">
                      <input
                        name="dzEmail"
                        required
                        className="form-control"
                        placeholder="Your Email Id"
                        type="email"
                      />
                      <span className="input-group-btn">
                        <button
                          name="submit"
                          value="Submit"
                          type="submit"
                          className="site-button radius-xl"
                        >
                          Subscribe
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
                <ul className="list-inline m-a0">
                  <li>
                    <a href="#" className="site-button facebook circle">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="site-button google-plus circle">
                      <i className="fab fa-google-plus-g"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="site-button linkedin circle">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="site-button instagram circle">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="site-button twitter circle">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Part */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 text-left">
              <span>
                Copyright <i className="fa fa-copyright"></i> 2024 MarQenti
              </span>
            </div>
            <div className="col-md-6 col-sm-6 text-right">
              <div className="widget-link">
                <ul>
                  <li>
                    <a href="about-2.html">About</a>
                  </li>
                  <li>
                    <a href="help-desk.html">Help Desk</a>
                  </li>
                  <li>
                    <a href="privacy-policy.html">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button className="scroltop icon-up" type="button">
        <i className="fas fa-arrow-up"></i>
      </button>
    </footer>
  );
};

export default Footer;
