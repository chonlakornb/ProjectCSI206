import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/books');
        setProducts(response.data);
      } catch (error) {
        setMessage('Failed to fetch products.');
      }
    };

    fetchBooks();
  }, []);

  const handleBuyNow = (product) => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProduct = cart.find((item) => item.id === product.id);

      if (!existingProduct) {
        cart.push({ ...product, quantity: 1 });
      } else {
        existingProduct.quantity = 1; // Ensure quantity is set to 1
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      navigate('/checkout', { state: { product } });
    } catch {
      setMessage('Failed to process the purchase.');
    }
  };

  const handleAddToCart = (product) => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProduct = cart.find((item) => item.id === product.id);

      if (!existingProduct) {
        cart.push({ ...product, quantity: 1 });
        localStorage.setItem('cart', JSON.stringify(cart));
        setMessage(`${product.title} added to cart!`);
      } else {
        setMessage(`${product.title} is already in the cart.`);
      }

      setTimeout(() => setMessage(''), 1000);
    } catch {
      setMessage('Failed to add to cart.');
    }
  };

  const handleAddToFavorites = async (product) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:3000/api/favorites/${product.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setMessage(`${product.title} added to favorites!`);
      setTimeout(() => setMessage(''), 1000);
    } catch (error) {
      if (error.response?.status === 400) {
        setMessage('This book is already in your favorites.');
      } else if (error.response?.status === 401) {
        setMessage('You need to login to add favorites.');
      } else {
        setMessage('Failed to add to favorites.');
      }
    }
  };

  return (
    <div className="products" id="Products">
      <h1>PRODUCTS</h1>
      {message && <p className="message">{message}</p>}
      <div className="box">
        {products.map((product) => (
          <div
            className="card"
            key={product.id}
            onClick={() => navigate('/viewpage', { state: { product } })}
            style={{ cursor: 'pointer' }}
          >
            <div className="image">
              <img
                src={
                  product.cover_image.startsWith('http')
                    ? product.cover_image
                    : `http://localhost:3000${product.cover_image}`
                }
                alt={`Product ${product.id}`}
              />
            </div>
            <div className="products_text">
              <h2>{product.title}</h2>
              <p>{product.author}</p>
              <h3>${product.price?.toFixed(2) || 'N/A'}</h3>
              <div className="products_star">
                {[...Array(5)].map((_, starIndex) => (
                  <i
                    key={starIndex}
                    className={`fa-solid ${starIndex < 4 ? 'fa-star' : 'fa-star-half-stroke'}`}
                  ></i>
                ))}
              </div>

              {/* Buttons */}
              <div className="button-group">
                <div className="top-buttons">
                  <button
                    className="btn cart-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
                <button
                  className="btn favorite-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToFavorites(product);
                  }}
                >
                  Favorite
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
