import  { ReactElement } from "react";
import Banner from "components/banner/banner";
import ContactSection from "components/ContactUs/ContactUs";

const ContactUsPage= () : ReactElement  => {
  return (
    <div className="content-block  ">
      <Banner title="Contactez-Nous" />
      <ContactSection />
    </div>
  );
};

export default ContactUsPage;
