import  { ReactElement } from 'react';
import Banner from 'components/banner/banner';
import Portfolio from 'components/PortfolioSection/Portfolio';

const PortfolioPage = (): ReactElement => {
  return (
    <div className="page-content bg-white">
      <Banner title="Notre Galerie" />
      <Portfolio />
    </div>
  );
};

export default PortfolioPage;
