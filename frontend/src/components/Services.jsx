import React from 'react';

const Services = () => {
  return (
    <div className="services" id="Servises">
      <h1>our<span>services</span></h1>
      <div className="services_cards">
        {['Fast Delivery', '10 Days Replacement', '24 x 7 Support'].map((service, index) => (
          <div className="services_box" key={index}>
            <i className={`fa-solid ${index === 0 ? 'fa-truck-fast' : index === 1 ? 'fa-rotate-left' : 'fa-headset'}`}></i>
            <h3>{service}</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
