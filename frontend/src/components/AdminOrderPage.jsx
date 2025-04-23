import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import { FaClock, FaSync, FaTruck, FaCheckCircle } from 'react-icons/fa';
import './AdminOrderPage.css';

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(
          Array.isArray(data)
            ? data.map(order => ({
                id: order.order_id,
                total_price: order.total_price || 0,
                payment_method: order.payment_method || 'N/A',
                status: order.status || 'Unknown',
                address_id: order.address_id, // Include address_id
                address: `${order.street_address}, ${order.province}, ${order.postal_code}, ${order.country}`, // Full address
              }))
            : []
        );
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Capture error details from the response
        console.error('Error response:', errorData); // Log the error response
        throw new Error(errorData.message || 'Failed to update order status');
      }

      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      setMessage('✅ Order status updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating order status:', error); // Log the error
      setMessage('❌ Failed to update order status.');
      setTimeout(() => setMessage(''), 3000);
    }
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
          {orders.length > 0 ? (
            orders.map(order => (
              <div className="order-card" key={order.id}>
                <div className="card-content">
                  <h2>Order ID: {order.id}</h2>
                  <p><strong>Address ID:</strong> {order.address_id}</p> {/* Display address_id */}
                  <p><strong>Address:</strong> {order.address}</p> {/* Display full address */}
                  <p><strong>Total Price:</strong> ${Number(order.total_price || 0).toFixed(2)}</p>
                  <p>
                    <strong>Status:</strong>
                    <span className={`status ${(order.status || '').toLowerCase()}`}>
                      {getStatusIcon(order.status)} {order.status || 'Unknown'}
                    </span>
                  </p>
                  <p><strong>Payment:</strong> {order.payment_method || 'N/A'}</p>
                  <div className="button-group">
                    <select
                      className="status-select"
                      value={order.status || 'pending'}
                      onChange={e => handleStatusChange(order.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No orders available.</p> // Fallback message if no orders
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderPage;
