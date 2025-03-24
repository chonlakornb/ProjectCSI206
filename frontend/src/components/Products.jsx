import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const Products = () => {
  const products = [
    {
      id: 1,
      name: 'KAGURABACHI',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      price: 140.00,
      image: '1.png',
    },
    {
      id: 2,
      name: 'ONE PIECE 104',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      price: 120.00,
      image: '3.png',
    },
    {
      id: 3,
      name: 'SAKAMOTO DAYS ',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      price: 140.00,
      image: '5.png',
    },
    {
      id: 4,
      name: 'SAKAMOTO DAYS 16',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      price: 160.00,
      image: '6.png',
    },
    {
      id: 5,
      name: 'JUJUTSU KAISEN 28',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      price: 180.00,
      image: '7.png',
    },
    {
      id: 6,
      name: 'MY HERO ACADEMIA ',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      price: 200.00,
      image: '8.png',
    },
    {
      id: 7,
      name: 'KAIJU NO.8 12',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      price: 220.00,
      image: '9.png',
    },
    {
      id: 8,
      name: 'KAIJU NO.8 8',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      price: 240.00,
      image: '10.png',
    },
    {
      id: 9,
      name: 'JUJUTSU KAISEN 26',
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
      price: 260.00,
      image: '11.png',
    },
  ];

  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleViewProduct = (product) => {
    navigate('/view', { state: { product: { ...product, image: `/src/img/${product.image}` } } }); // Pass full image path
  };

  const handleAddToFavorites = async (product) => {
    try {
      await axios.post(
        'http://localhost:3000/api/favorites',
        {
          book_id: product.id,
          title: product.name,
          author: product.description,
          cover_image: `/src/img/${product.image}`,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMessage(`${product.name} added to favorites!`);
      setTimeout(() => {
        setMessage('');
        navigate('/favorites'); // Navigate to the Favorites page immediately
      }, 500); // Redirect after 0.5 seconds
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add to favorites.');
    }
  };

  return (
    <div className="products" id="Products">
      <h1>PRODUCTS</h1>
      {message && <p className="message">{message}</p>}
      <div className="box">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <div className="small_card">
              <i className="fa-solid fa-heart"></i>
              <i className="fa-solid fa-share"></i>
            </div>
            <div className="image">
              <img src={`./src/img/${product.image}`} alt={`Product ${product.id}`} />
            </div>
            <div className="products_text">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <h3>${product.price.toFixed(2)}</h3>
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
              <div className="button-group">
                <button
                  className="btn"
                  onClick={() => handleViewProduct(product)} // Navigate to ViewPage
                >
                  View
                </button>
                <button
                  className="favorite-btn"
                  onClick={() => handleAddToFavorites(product)}
                >
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
