import React, { useState } from 'react';
import Navbar from './Navbar';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: 'cod',
  });

  const [message, setMessage] = useState('');

  const items = [
    { id: 1, name: 'สินค้า A', price: 100 },
    { id: 2, name: 'สินค้า B', price: 200 },
    { id: 3, name: 'สินค้า C', price: 300 },
  ];

  const selectedItems = [items[0], items[2]];
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);
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
              {selectedItems.map((item) => (
                <li key={item.id}>
                  {item.name} - ฿{item.price}
                </li>
              ))}
            </ul>

            <div className="summary">
              <p>ราคารวมสินค้า: ฿{totalPrice}</p>
              <p>ค่าจัดส่ง: ฿{shippingCost}</p>
              <p className="total">รวมทั้งหมด: ฿{grandTotal}</p>
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
                  <p>ยอดชำระ ฿{grandTotal}</p>
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
