import React from 'react';
import './Footer.css';

const Footer = () => {
  // Define the logo mapping directly in the component
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
  };

  const getLogoPath = (companyName) => {
    const name = companyName.toLowerCase();
    return logoMap[name] || '/images/default-logo.png';
  };

  // Define a static list of featured companies for the footer
  const featuredCompanies = [
    'Tata Motors',
    'Mahindra & Mahindra',
    'Reliance Industries',
    'Infosys',
    'Wipro',
    'Hindustan Unilever'
  ];

  // Duplicate the companies array to create a seamless loop
  const duplicatedCompanies = [...featuredCompanies, ...featuredCompanies];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="text-center py-6">
          <h3 className="text-3xl font-bold text-gray-800">
            India's Corporate Horizon
          </h3>
        </div>
        <div className="logo-scroll-container">
          <div className="footer-companies">
            {duplicatedCompanies.map((companyName, index) => {
              // Use a unique key for each item, including the index to ensure uniqueness
              const uniqueKey = `${companyName}-${index}`;
              return (
                <div key={uniqueKey} className="logo-item">
                  <img 
                    src={process.env.PUBLIC_URL + getLogoPath(companyName)} 
                    alt={companyName} 
                    title={companyName}
                    className="company-logo"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = process.env.PUBLIC_URL + '/images/default-company-logo.png';
                      e.target.alt = `${companyName} (logo not available)`;
                      e.target.title = `${companyName} (logo not available)`;
                    }}
                  />
                </div>
              );
            })}
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
