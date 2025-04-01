import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NikePage from './components/NikePage';
import Favorites from './components/Favorites';
import ViewPage from './components/ViewPage'; // Import ViewPage
import AdminPage from './components/AdminPage';
import './App.css';

const ProtectedRoute = ({ children, role }) => {
  const userRole = localStorage.getItem('userRole'); // Get user role from localStorage
  return userRole === role ? children : <Navigate to="/" />; // Check if role matches
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="/home" element={<NikePage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/view" element={<ViewPage />} /> {/* Add ViewPage route */}
      </Routes>
    </Router>
  );
};

export default App;
