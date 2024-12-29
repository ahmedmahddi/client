import CompanyStats from "components/AboutUsSection/CompanyStats";
import Partners from "components/AboutUsSection/Partners";
import ServicesSection from "components/AboutUsSection/ServicesSection";
import Testimonials from "components/AboutUsSection/Testimonials";
import WhoWeAre from "components/AboutUsSection/WhoAreWe";
import WhyChooseUs from "components/AboutUsSection/WhyChooseUs";
import Banner from "components/banner/banner";
import { ReactElement } from "react";

const AboutUsPage = (): ReactElement => {
  return (
    <div className="section-bg-image bg-pattern-2">
      <Banner title="À propos de notre société" />
      <WhoWeAre />
      <WhyChooseUs />
      <ServicesSection />
      <CompanyStats />
      <Testimonials />
      <Partners />
    </div>
  );
};

export default AboutUsPage;
