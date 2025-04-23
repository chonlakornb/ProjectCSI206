import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import { FaClock, FaSync, FaTruck, FaCheckCircle } from 'react-icons/fa';
import './AdminOrderPage.css';

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState({});
  const [message, setMessage] = useState('');

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

    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/address', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
          throw new Error('Unauthorized');
        }

        const data = await response.json();
        const addressMap = Array.isArray(data)
          ? data.reduce((map, address) => {
              map[address.orderId] = address.street_address; // Ensure correct mapping
              return map;
            }, {})
          : {};
        setAddresses(addressMap);
      } catch (error) {
        console.error('Error fetching addresses:', error);
        setAddresses({});
      }
    };

    fetchOrders();
    fetchAddresses();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    setMessage('✅ Order status updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const getStatusIcon = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'pending':
        return <FaClock className="status-icon pending" />;
      case 'processing':
        return <FaSync className="status-icon processing" />;
      case 'shipped':
        return <FaTruck className="status-icon shipped" />;
      case 'delivered':
        return <FaCheckCircle className="status-icon delivered" />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-order-page">
      <AdminNavbar />
      <div className="admin-order-container">
        <h1>Order Management</h1>
        {message && <div className="message">{message}</div>}
        <div className="card-list">
          {orders.map(order => (
            <div className="order-card" key={order.id}>
              <div className="card-content">
                <h2>Order ID: {order.id}</h2>
                <p>
                  <strong>Status:</strong>
                  <span className={`status ${(order.status || '').toLowerCase()}`}>
                    {getStatusIcon(order.status)} {order.status || 'Unknown'}
                  </span>
                </p>
                <p><strong>Total Price:</strong> ${Number(order.total_price || 0).toFixed(2)}</p>
                <p><strong>Payment:</strong> {order.payment_method || 'N/A'}</p>
                <p><strong>Address:</strong> {addresses[order.id] || 'N/A'}</p>
                <div className="button-group">
                  <select
                    className="status-select"
                    value={order.status || 'Pending'}
                    onChange={e => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderPage;
