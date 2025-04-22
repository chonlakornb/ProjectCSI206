import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import './AdminUserPage.css';

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        setMessage('Failed to fetch users.');
      }
    };

    const checkAdminRole = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.role !== 'admin') {
          navigate('/'); // Redirect non-admin users
        }
      } catch (error) {
        navigate('/'); // Redirect if token is invalid
      }
    };

    checkAdminRole();
    fetchUsers();
  }, [navigate]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3000/api/users/${userId}`, // Corrected endpoint
        { role: newRole }, // Ensure the body contains the role field
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map(user => (user.id === userId ? { ...user, role: newRole } : user)));
      setMessage('User role updated successfully!');
    } catch (error) {
      setMessage('Failed to update user role.');
    }
  };

  const handleUserUpdate = async (userId, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3000/api/users/${userId}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map(user => (user.id === userId ? { ...user, ...updatedData } : user)));
      setMessage('User details updated successfully!');
    } catch (error) {
      setMessage('Failed to update user details.');
    }
  };

  const handleSave = async (userId, username, password) => {
    try {
      const token = localStorage.getItem('token');
      const updatedData = { username };
      if (password) updatedData.password = password;

      await axios.put(
        `http://localhost:3000/api/users/${userId}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map(user => (user.id === userId ? { ...user, username } : user)));
      setMessage('User details saved successfully!');
    } catch (error) {
      setMessage('Failed to save user details.');
    }
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter(user => user.id !== userId));
      setMessage('User deleted successfully!');
    } catch (error) {
      setMessage('Failed to delete user.');
    }
  };

  return (
    <div className="admin-user-page">
      <AdminNavbar />
      <h1>User Management</h1>
      {message && <p className="message">{message}</p>}
      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <input
                    type="text"
                    value={user.username}
                    onChange={e =>
                      setUsers(users.map(u => (u.id === user.id ? { ...u, username: e.target.value } : u)))
                    }
                  />
                </td>
                <td>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    onChange={e =>
                      setUsers(users.map(u => (u.id === user.id ? { ...u, password: e.target.value } : u)))
                    }
                  />
                </td>
                <td>{user.role}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={e => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    onClick={() => handleSave(user.id, user.username, user.password)}
                    style={{ backgroundColor: '#28a745', color: 'white' }} // Green background, white text
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    style={{ backgroundColor: '#dc3545', color: 'white' }} // Red background, white text
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserPage;
