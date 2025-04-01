import React from 'react';
import './AdminPage.css';

const AdminPage = () => {
  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, Admin! Manage your application here.</p>
      </header>

      <div className="admin-sections">
        <div className="admin-card">
          <h2>Manage Users</h2>
          <p>View, edit, or delete user accounts.</p>
          <button>Go to Users</button>
        </div>
        <div className="admin-card">
          <h2>Manage Products</h2>
          <p>Add, edit, or remove products from the store.</p>
          <button>Go to Products</button>
        </div>
        <div className="admin-card">
          <h2>View Statistics</h2>
          <p>Analyze sales and user activity.</p>
          <button>View Stats</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
