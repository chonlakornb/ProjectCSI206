import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [userRole, setUserRole] = useState('Guest'); // Default role

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
          throw new Error('No token found');
        }
        const response = await fetch('http://localhost:3000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is included in Authorization header
          },
        });
        const data = await response.json();
        setUserRole(data.role || 'Guest'); // Update role from API
      } catch (error) {
        console.error('Failed to fetch user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <nav>
      <div className="logo">
        <h1>BOOK<span></span></h1>
      </div>
      <ul>
        <li><a href="/home#Home">Recomment</a></li>
        <li><a href="/home#Products">Products</a></li>
        <li><a href="/favorites#Favorites">Favorites</a></li>
        <li><a href="#Notifications">Notifications</a></li>
      </ul>

      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-input" />
        <button className="search-btn">
          <i className="fa-solid fa-magnifying-glass"></i> Search
        </button>
      </div>

      <div className="icons">
        <i className="fa-solid fa-heart"></i>
        <i className="fa-solid fa-cart-shopping"></i>
        <i className="fa-solid fa-user"></i>
      </div>

      {/* Display the user's role */}
      <div className="user-role">
        <p>Role: {userRole}</p>
      </div>
    </nav>
  );
};

export default Navbar;
