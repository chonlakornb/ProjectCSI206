import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password });
  };

  return (
    <div>
      <h2>เข้าสู่ระบบ</h2>
      <form onSubmit={handleSubmit}>
        <label>ชื่อผู้ใช้:</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <label>รหัสผ่าน:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">เข้าสู่ระบบ</button>
      </form>
    </div>
  );
}

export default Login;
