import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import './AddressPage.css';

const AddressPage = () => {
  const [streetAddress, setStreetAddress] = useState('');
  const [province, setProvince] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAddAddress = async () => {
    if (!streetAddress || !province || !state || !postalCode || !country) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/api/address',
        {
          street_address: streetAddress,
          province,
          state,
          postal_code: postalCode,
          country,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Address added successfully!');
      setTimeout(() => navigate('/home'), 1000); // Redirect to home after 1 second
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add address.');
    }
  };

  return (
    <div className="address-page">
      <Navbar />
      <div className="address-container">
        <h1>Add Address</h1>
        {message && <p className="message">{message}</p>}
        <input
          type="text"
          placeholder="Street Address"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Province"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button onClick={handleAddAddress}>Add Address</button>
      </div>
    </div>
  );
};

export default AddressPage;
