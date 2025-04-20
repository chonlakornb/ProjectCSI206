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
    navigate('/view', { state: { product: { ...product, image: product.cover_image } } });
  };

  const handleAddToFavorites = async (product) => {
    try {
      await axios.post(
        'http://localhost:3000/api/favorites',
        {
          book_id: product.id,
          title: product.title,
          author: product.author,
          cover_image: product.cover_image,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMessage(`${product.title} added to favorites!`);
      setTimeout(() => {
        setMessage('');
        navigate('/favorites');
      }, 500);
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
