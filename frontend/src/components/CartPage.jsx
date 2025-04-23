import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const updateLocalStorage = (items) => {
    setCartItems(items);
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateLocalStorage(updatedCart);
  };

  const handleQuantityChange = (id, delta) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    updateLocalStorage(updatedCart);
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <Navbar />
      <div className="cart-container">
        <h1>🛒 ตะกร้าสินค้าของคุณ</h1>
        {cartItems.length === 0 ? (
          <p className="empty-message">ไม่มีสินค้าในตะกร้า</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.cover_image} alt={item.title} />
                  <div className="item-details">
                    <h2>{item.title}</h2>
                    <p className="price">${item.price.toFixed(2)}</p>
                    <div className="quantity-controls">
                      <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>
                      ลบสินค้า
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>รวมทั้งหมด</h2>
              <p>จำนวนสินค้า: <strong>{totalQuantity}</strong></p>
              <p>ราคารวม: <strong>${totalPrice.toFixed(2)}</strong></p>
              <button className="checkout-btn" onClick={() => navigate('/checkout')}>
                ดำเนินการชำระเงิน
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
