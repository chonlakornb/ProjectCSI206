import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NikePage from './components/NikePage';
import Favorites from './components/Favorites';
import ViewPage from './components/ViewPage'; // Import ViewPage
import AdminPage from './components/AdminPage'; // Import AdminPage
import EditProfilePage from './components/EditProfilePage'; // Import EditProfilePage
import './App.css';

const ProtectedRoute = ({ children, role }) => {
  const userRole = localStorage.getItem('userRole'); // Get user role from localStorage
  return userRole === role ? children : <Navigate to="/" />; // Check if role matches
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect root to login */}
        <Route path="/login" element={<LoginPage />} />
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
        <Route path="/admin" element={<AdminPage />} /> {/* Add AdminPage route */}
        <Route path="/edit-profile" element={<EditProfilePage />} /> {/* Add EditProfilePage route */}
      </Routes>
    </Router>
  );
};

export default App;
