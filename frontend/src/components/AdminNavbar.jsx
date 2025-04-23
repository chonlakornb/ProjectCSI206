import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="logo">
        <h1>ADMIN<span>Panel</span></h1>
      </div>
      <ul>
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        {/* <li><Link to="/admin/books">Books</Link></li> */}
        <li><Link to="/admin/orders-page">Orders</Link></li>
        <li><Link to="/home">Back to Shop</Link></li>
        <li><Link to="/login">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
