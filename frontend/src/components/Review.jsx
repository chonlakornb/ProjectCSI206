import React from 'react';

const Review = () => {
  const profileImages = [
    'girl_dp1.jpg',
    'man_dp1.jpg',
    'man_dp2.jpg',
    'girl_dp3.jpg',
    'girl_dp2.jpg',
    'man_dp3.jpg',
  ];

  return (
    <div className="review" id="Review">
      <h1>Customer's<span>review</span></h1>
      <div className="review_box">
        {profileImages.map((image, index) => (
          <div className="review_card" key={index}>
            <div className="card_top">
              <div className="profile">
                <div className="profile_image">
                  <img src={`./src/img/${image}`} alt="Profile" />
                </div>
                <div className="name">
                  <strong>{`Customer ${index + 1}`}</strong>
                  <div className="like">
                    {[...Array(5)].map((_, starIndex) => (
                      <i
                        key={starIndex}
                        className={`fa-solid ${
                          starIndex < 4 ? 'fa-star' : 'fa-star-half-stroke'
                        }`}
                      ></i>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="comment">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
