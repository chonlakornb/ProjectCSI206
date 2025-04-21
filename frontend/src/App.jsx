import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NikePage from './components/NikePage';
import Favorites from './components/Favorites';
import ViewPage from './components/ViewPage'; // Import ViewPage
import AdminPage from './components/AdminPage'; // Import AdminPage
import EditProfilePage from './components/EditProfilePage'; // Import EditProfilePage
import CartPage from './components/CartPage'; // Import CartPage
import CheckoutPage from './components/CheckoutPage'; // Import CheckoutPage
import ProductReviewPage from './components/ProductReviewPage'; // Import ProductReviewPage
import Products from './components/Products'; // Import Products
import ErrorBoundary from './components/ErrorBoundary'; // Import ErrorBoundary
import './App.css';

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect root to login */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<NikePage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/view" element={<ViewPage />} /> {/* Add ViewPage route */}
          <Route path="/admin" element={<AdminPage />} /> {/* Add AdminPage route */}
          <Route path="/edit-profile" element={<EditProfilePage />} /> {/* Add EditProfilePage route */}
          <Route path="/cart" element={<CartPage />} /> {/* Add CartPage route */}
          <Route path="/checkout" element={<CheckoutPage />} /> {/* Add CheckoutPage route */}
          <Route path="/reviews" element={<ProductReviewPage />} /> {/* Add ProductReviewPage route */}
          <Route path="/products" element={<Products />} /> {/* Add Products route */}
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
