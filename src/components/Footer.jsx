import React from 'react';
import './Footer.css';
import companiesData from '../data/companies.json';

const Footer = () => {
  const getLogoPath = (companyName) => {
    const name = companyName.toLowerCase();
    const logoMap = {
      'tata motors': '/images/tata-motors.png',
      'mahindra & mahindra': '/images/mahindra-logo.webp',
      'bajaj auto': '/images/bajaj-logo.png',
      'reliance industries': '/images/Reliance_Industries.png',
      'tata consultancy services': '/images/Tata_Consultancy_Services_old_logo.png',
      'infosys': '/images/Infosys_logo.png',
      'wipro': '/images/Wipro_new_logo.png',
      'hindustan unilever': '/images/HINDUNILVR.NS_BIG-24495890.png',
      'itc': '/images/ITC_Limited-Logo.wine.svg',
      'marico': '/images/Marico.png',
      'microsoft': '/images/Microsoft_logo_(2012).png',
      'vodafone idea': '/images/Vodafone_Idea_logo.png',
      'amazon': '/images/amazon-logo-transparent.png',
      'google': '/images/google-logo-transparent.png',
      'jio': '/images/jio.png',
      'tata power': '/images/tata-power.png',
      'adani': '/images/Adani_2012_logo.png',
      'airtel': '/images/Bharti_Airtel-Logo.wine.png'
    };

    const match = Object.entries(logoMap).find(([key]) => name.includes(key.toLowerCase()));
    return match ? match[1] : '/images/default-company-logo.png';
  };

  const companyLogos = [...new Map(companiesData.map(company => [company.name, company])).entries()]
    .map(([name, company]) => ({
      name,
      logo: getLogoPath(name) || company.logo || '/images/default-company-logo.png'
    }));

  const duplicatedLogos = [...companyLogos, ...companyLogos];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="text-center py-6">
          <h3 className="text-3xl font-bold text-gray-800">
            India's Corporate Horizon
          </h3>
        </div>
        <div className="logo-scroll-container">
          <div className="logo-scroll">
            {duplicatedLogos.map((logo, index) => (
              <div key={`${logo.name}-${index}`} className="logo-item">
                <img 
                  src={process.env.PUBLIC_URL + logo.logo} 
                  alt={logo.name} 
                  title={logo.name}
                  className="company-logo"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = process.env.PUBLIC_URL + '/images/default-company-logo.png';
                    e.target.alt = `${logo.name} (logo not available)`;
                    e.target.title = `${logo.name} (logo not available)`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Companies Directory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
