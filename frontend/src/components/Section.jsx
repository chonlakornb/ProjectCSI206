import React from 'react';

const Section = () => {
  return (
    <section>
      <nav>
        <div className="logo">
          <h1>BOOK<span></span></h1>
        </div>
        <ul>
          <li><a href="#Home">Home</a></li>
          <li><a href="#Products">Products</a></li>
          <li><a href="#Favorites">Favorites</a></li>
          <li><a href="#Notifications">Notifications</a></li>
          <li><a href="#Recommendations">Recommendations</a></li>
          <li><a href="#Reviews">Reviews</a></li>
        </ul>

        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="search-btn">
            <i className="fa-solid fa-magnifying-glass"></i> Search
          </button>
        </div>

        <div className="icons">
          <i className="fa-solid fa-heart"></i>
          <i className="fa-solid fa-cart-shopping"></i>
          <i className="fa-solid fa-user"></i>
        </div>
      </nav>
      <div className="main" id="Home">
        <div className="main_content">
          <div className="main_image">
            <img src="./src/img/4.jpeg" alt="" />
            <img src="./src/img/2.png" alt="" />
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
