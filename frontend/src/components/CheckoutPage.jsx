import React, { useState } from 'react';
import Navbar from './Navbar';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    if (
      !formData.name ||
      !formData.address ||
      !formData.cardNumber ||
      !formData.expiryDate ||
      !formData.cvv
    ) {
      setMessage('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    setMessage('ชำระเงินสำเร็จ! ขอบคุณสำหรับการสั่งซื้อของคุณ');
  };

  return (
    <div className="checkout-page">
      <Navbar />
      <div className="checkout-container">
        <h1>ชำระเงิน</h1>
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
          <input
            type="text"
            name="cardNumber"
            placeholder="หมายเลขบัตรเครดิต"
            value={formData.cardNumber}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="วันหมดอายุ (MM/YY)"
            value={formData.expiryDate}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleCheckout}>
            ยืนยันการชำระเงิน
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
