import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar'; // นำเข้า Navbar
import './ViewPage.css';

const ViewPage = () => {
  const location = useLocation();
  const [product, setProduct] = useState({
    id: 0,
    title: 'Unknown Product',
    author: 'Unknown Author',
    description: 'No description available.',
    price: 0.0,
    image: '/src/img/default.png',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const productId = location.state?.product?.id;
      if (productId) {
        try {
          const response = await fetch(`http://localhost:3000/api/books/${productId}`);
          if (response.ok) {
            const data = await response.json();
            setProduct(data);
          } else {
            console.error('Failed to fetch product details');
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
    };

    fetchProduct();
  }, [location.state]);

  const recommendedProducts = [
    { id: 2, name: 'ONE PIECE 104', price: 120.0, image: '/src/img/3.png' },
    { id: 3, name: 'SAKAMOTO DAYS 1', price: 140.0, image: '/src/img/5.png' },
    { id: 4, name: 'JUJUTSU KAISEN 28', price: 180.0, image: '/src/img/7.png' },
    { id: 5, name: 'KAIJU NO.8 12', price: 220.0, image: '/src/img/9.png' },
  ];

  return (
    <div className="view-page">
      <Navbar /> 
      
      <div className="product-details">
        <div className="product-card">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-info">
          <h1>{product.title}</h1>
          <h3>by {product.author}</h3>
          <p>{product.description}</p>
          <h2>${(product.price ?? 0).toFixed(2)}</h2>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="recommended-products">
        <h2>Recommended Products</h2>
        <div className="recommended-grid">
          {recommendedProducts.map((item) => (
            <div className="recommended-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
              <button className="view-btn">View</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
