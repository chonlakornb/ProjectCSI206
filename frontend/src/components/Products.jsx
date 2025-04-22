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

  const handleViewProduct = (product) => {
    try {
      navigate('/viewpage', { state: { product } }); // Ensure the route matches the one in your router
    } catch (error) {
      console.error('Navigation failed:', error);
      setMessage('Failed to navigate to the product view page.');
    }
  };

  const handleAddToCart = (product) => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProduct = cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      setMessage(`${product.title} added to cart!`);
      setTimeout(() => setMessage(''), 500);
    } catch (error) {
      setMessage('Failed to add to cart.');
    }
  };

  const handleAddToFavorites = async (product) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:3000/api/favorites/${product.id}`, // ✅ ใส่ bookId ใน path ตาม backend
        {}, // body ว่าง
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setMessage(`${product.title} added to favorites!`);
      setTimeout(() => setMessage(''), 500);
    } catch (error) {
      console.error('Error adding to favorites:', error.response || error.message);
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
          <div className="card" key={product.id}>
            <div className="small_card">
              <i className="fa-solid fa-heart"></i>
              <i className="fa-solid fa-share"></i>
            </div>
            <div className="image">
              <img src={product.cover_image} alt={`Product ${product.id}`} />
            </div>
            <div className="products_text">
              <h2>{product.title}</h2>
              <p>{product.author}</p>
              <h3>${product.price?.toFixed(2) || 'N/A'}</h3>
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
                  onClick={() => handleViewProduct(product)}
                >
                  View
                </button>
                <button
                  className="favorite-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  className="favorite-btn small"
                  onClick={() => handleAddToFavorites(product)}
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
