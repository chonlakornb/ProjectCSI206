import React from 'react';

const Section = () => {
  return (
    <section>
      <nav>
        <div className="logo">
          <h1>Shoe<span>s</span></h1>
        </div>
        <ul>
          <li><a href="#Home">Home</a></li>
          <li><a href="#Products">Products</a></li>
          <li><a href="#About">About</a></li>
          <li><a href="#Review">Review</a></li>
          <li><a href="#Servises">Services</a></li>
        </ul>
        <div className="icons">
          <i className="fa-solid fa-heart"></i>
          <i className="fa-solid fa-cart-shopping"></i>
          <i className="fa-solid fa-user"></i>
        </div>
      </nav>
      <div className="main" id="Home">
        <div className="main_content">
          <div className="main_image">
            <img src="./src/img/one piece 3.jpeg" alt="Nike Shoes" />
            <img src="./src/img/one piece 1.png" alt="Nike Shoes" />
            {/* <img src="./src/img/kagurabachi.PNG" alt="Nike Shoes" /> */}
          </div>

          <div className="main_text">
            <h1>NUMBER 1 IN SALES<br /><span></span></h1>
            <p>
              {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry... */}
            </p>
          </div>
        </div>
        <div className="social_icon">
          <i className="fa-brands fa-facebook-f"></i>
          <i className="fa-brands fa-twitter"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-linkedin-in"></i>
        </div>
        {/* <div className="button">
          <a href="#">SHOP NOW</a>
          <i className="fa-solid fa-chevron-right"></i>
        </div> */}
      </div>
    </section>
  );
};

export default Section;
