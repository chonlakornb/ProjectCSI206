import React from 'react';
import './NikePage.css';
import Section from './Section';
import Products from './Products';
import Favorites from './Favorites'; // Import Favorites component
import About from './About';
import Review from './Review';
import Services from './Services';
import Footer from './Footer';

const NikePage = () => {
  return (
    <div>
      <Section />
      <Products />
      {/* Add Favorites component */}
      {/* <About /> */}
      {/* <Review />
      <Services /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default NikePage;
