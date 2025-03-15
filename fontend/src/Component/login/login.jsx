import React, { useState } from 'react';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Login successful:', data);
      })
      .catch(error => console.error('Error logging in:', error));
  };

  return (
    <div className="login-container">
      <h2 className="login-title">เข้าสู่ระบบ</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label">ชื่อผู้ใช้:</label>
        <input 
          className="login-input"
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <label className="login-label">รหัสผ่าน:</label>
        <input 
          className="login-input"
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button className="login-button" type="submit">เข้าสู่ระบบ</button>
      </form>
    </div>
  );
}

export default Login;
