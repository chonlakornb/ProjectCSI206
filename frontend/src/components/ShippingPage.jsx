import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './ShippingPage.css';
import { FaTruck, FaBoxOpen, FaCheckCircle, FaFileInvoice } from 'react-icons/fa';

const ShippingPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const sampleOrders = [
      {
        id: 1,
        productName: 'Product A',
        price: 120.0,
        status: 'Shipped',
        estimatedDelivery: '2023-10-15',
        image: '/src/img/productA.png'
      },
      {
        id: 2,
        productName: 'Product B',
        price: 140.0,
        status: 'Processing',
        estimatedDelivery: '2023-10-20',
        image: '/src/img/productB.png'
      },
      {
        id: 3,
        productName: 'Product C',
        price: 180.0,
        status: 'Delivered',
        estimatedDelivery: '2023-10-10',
        image: '/src/img/productC.png'
      }
    ];
    setOrders(sampleOrders);
  }, []);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'shipped':
        return <FaTruck />;
      case 'processing':
        return <FaBoxOpen />;
      case 'delivered':
        return <FaCheckCircle />;
      default:
        return null;
    }
  };

  return (
    <div className="shipping-page">
      <Navbar />
      <div className="shipping-container">
        <h1>Shipping Status</h1>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="card-list">
            {orders.map((order) => (
              <div className="shipping-card" key={order.id}>
                <img src={order.image} alt={order.productName} className="product-image" />
                <div className="card-content">
                  <h2>{order.productName}</h2>
                  <p><strong>Order ID:</strong> #{order.id}</p>
                  <p><strong>Price:</strong> ${order.price.toFixed(2)}</p>
                  <p><strong>Status:</strong> <span className={`status ${order.status.toLowerCase()}`}>{getStatusIcon(order.status)} {order.status}</span></p>
                  <p><strong>Estimated Delivery:</strong> {order.estimatedDelivery}</p>

                  <div className="button-group">
                    <button className="view-details-btn">View Details</button>
                    <button className="invoice-btn">
                      <FaFileInvoice style={{ marginRight: '6px' }} /> Download Invoice
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingPage;
