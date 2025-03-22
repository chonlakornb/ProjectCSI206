import React from 'react';

const Products = () => {
  const productImages = [
    'shoes1.png',
    'shoes2.png',
    'shoes3.png',
    'shoes4.png',
    'shoes5.png',
    'shoes6.png',
    'shoes7.png',
    'shoes8.png',
  ];

  return (
    <div className="products" id="Products">
      <h1>Products</h1>
      <div className="box">
        {productImages.map((image, index) => (
          <div className="card" key={index}>
            <div className="small_card">
              <i className="fa-solid fa-heart"></i>
              <i className="fa-solid fa-share"></i>
            </div>
            <div className="image">
              <img src={`./src/img/${image}`} alt={`Product ${index + 1}`} />
            </div>
            <div className="products_text">
              <h2>NIKE</h2>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
              <h3>${(100 + index * 20).toFixed(2)}</h3>
              <div className="products_star">
                {[...Array(5)].map((_, starIndex) => (
                  <i
                    key={starIndex}
                    className={`fa-solid ${
                      starIndex < 4 ? 'fa-star' : 'fa-star-half-stroke'
                    }`}
                  ></i>
                ))}
              </div>
              <a href="#" className="btn">Add To Cart</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
