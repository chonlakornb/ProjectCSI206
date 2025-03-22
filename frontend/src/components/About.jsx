import React from 'react';

const About = () => {
  const redShoesImages = [
    'red_shoes1.png',
    'red_shoes2.png',
    'red_shoes3.png',
    'red_shoes4.png',
  ];

  return (
    <div className="about" id="About">
      <h1>Web<span>About</span></h1>
      <div className="about_main">
        <div className="about_image">
          <div className="about_small_image">
            {redShoesImages.map((image, index) => (
              <img
                key={index}
                src={`./src/img/${image}`}
                alt={`Red Shoes ${index + 1}`}
                onClick={(e) => {
                  document.getElementById('imagebox').src = e.target.src;
                }}
              />
            ))}
          </div>
          <div className="image_contaner">
            <img src="./src/img/red_shoes1.png" id="imagebox" alt="Main Red Shoes" />
          </div>
        </div>
        <div className="about_text">
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text...
          </p>
        </div>
      </div>
      <a href="#" className="about_btn">Shop Now</a>
    </div>
  );
};

export default About;
