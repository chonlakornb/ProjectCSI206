import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        username,
        password,
      });
      const { token, message, role } = response.data; // Ensure token is included in response
      localStorage.setItem('token', token); // Store token in localStorage
      localStorage.setItem('userRole', role); // Store role in localStorage
      setMessage(message || 'Login successful!');
      setTimeout(() => navigate(role === 'admin' ? '/admin' : '/home'), 1000);
    } catch (error) {
      if (error.response?.status === 401) {
        setMessage('Invalid credentials. Please try again.');
      } else {
        setMessage(error.response?.data?.message || 'Login failed!');
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
      <button onClick={() => navigate('/register')} className="switch-button">
        Go to Register
      </button>
    </div>
  );
};

export default LoginPage;
