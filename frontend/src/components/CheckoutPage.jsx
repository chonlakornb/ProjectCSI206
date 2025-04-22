import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: 'cod',
  });

  const [message, setMessage] = useState('');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = 29;
  const grandTotal = totalPrice + shippingCost;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    if (!formData.name || !formData.address || !formData.paymentMethod) {
      setMessage('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    setMessage('✅ ชำระเงินสำเร็จ! ขอบคุณสำหรับการสั่งซื้อของคุณ');
  };

  return (
    <div className="checkout-page">
      <Navbar />
      <div className="checkout-container">
        <div className="checkout-content">
          {/* ซ้าย: รายการสินค้า + ที่อยู่ */}
          <div className="checkout-left">
            <h2>รายการสินค้า</h2>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.cover_image} alt={item.title} className="cart-item-image" />
                  <div>
                    {item.title} x {item.quantity} - ฿{(item.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>

            <div className="summary">
              <p>ราคารวมสินค้า: ฿{totalPrice.toFixed(2)}</p>
              <p>ค่าจัดส่ง: ฿{shippingCost}</p>
              <p className="total">รวมทั้งหมด: ฿{grandTotal.toFixed(2)}</p>
            </div>

            <div className="address-display">
              <h3>ที่อยู่จัดส่ง</h3>
              <p>{formData.address || 'กรุณากรอกที่อยู่ด้านขวา'}</p>
            </div>
          </div>

          {/* ขวา: ช่องกรอกข้อมูลและการชำระเงิน */}
          <div className="checkout-right">
            <h2>ข้อมูลลูกค้า</h2>
            {message && <p className="message">{message}</p>}
            <form>
              <input
                type="text"
                name="name"
                placeholder="ชื่อ-นามสกุล"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="address"
                placeholder="ที่อยู่สำหรับจัดส่ง"
                value={formData.address}
                onChange={handleInputChange}
              />

              <label>วิธีการชำระเงิน:</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
              >
                <option value="cod">เก็บเงินปลายทาง</option>
                <option value="qr">QR พร้อมเพย์</option>
              </select>

              {formData.paymentMethod === 'qr' && (
                <div className="qr-instructions">
                  <p>กรุณาแสกน QR code เพื่อชำระเงิน</p>
                  <img
                    src="https://promptpay.io/0123456789/1.png"
                    alt="QR พร้อมเพย์"
                    width="200"
                    height="200"
                  />
                  <p>ยอดชำระ ฿{grandTotal.toFixed(2)}</p>
                </div>
              )}

              <button type="button" onClick={handleCheckout}>
                ยืนยันการชำระเงิน
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
