import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './ShippingPage.css';
import { FaTruck, FaBoxOpen, FaCheckCircle, FaFileInvoice } from 'react-icons/fa';

const ShippingPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/orders/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
          throw new Error('Unauthorized');
        }

        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    if (!status) return null; // Ensure status is defined
    switch (status.toLowerCase()) {
      case 'shipped':
        return <FaTruck className="status-icon shipped" />;
      case 'processing':
        return <FaBoxOpen className="status-icon processing" />;
      case 'delivered':
        return <FaCheckCircle className="status-icon delivered" />;
      default:
        return null;
    }
  };

  return (
    <div className="shipping-page">
      <Navbar />
      <div className="shipping-container">
        <h1>Shipping Orders</h1>
        {orders.length === 0 ? (
          <p className="empty-message">No orders found.</p>
        ) : (
          <div className="card-list">
            {orders.map((order) => (
              <div className="shipping-card" key={order.id}>
                <img src={order.image || '/src/img/default.png'} alt={order.productName || 'Product'} className="product-image" />
                <div className="card-content">
                  <h2>{order.productName || 'Unknown Product'}</h2>
                  <p><strong>Order ID:</strong> #{order.id}</p>
                  <p><strong>Price:</strong> ${Number(order.price || 0).toFixed(2)}</p>
                  <p><strong>Status:</strong> <span className={`status ${(order.status || '').toLowerCase()}`}>{getStatusIcon(order.status)} {order.status || 'Unknown'}</span></p>
                  <p><strong>Estimated Delivery:</strong> {order.estimatedDelivery || 'N/A'}</p>
                  <div className="button-group">
                    <button className="view-details-btn">🔍 View Details</button>
                    <button className="invoice-btn">
                      <FaFileInvoice className="invoice-icon" /> Invoice
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
