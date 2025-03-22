import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footer_main">
        {['Contact', 'Get Help', 'Our Stores', 'Follow Us', 'Newsletter'].map((section, index) => (
          <div className="tag" key={index}>
            <h1>{section}</h1>
            {/* Add content dynamically */}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
