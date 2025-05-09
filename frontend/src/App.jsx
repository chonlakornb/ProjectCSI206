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
import ShippingPage from './components/ShippingPage'; // Import ShippingPage
import AdminUserPage from './components/AdminUserPage'; // Import AdminUserPage
import AdminOrderPage from './components/AdminOrderPage'; // Import AdminOrderPage
import ViewOrderDetails from './components/ViewOrderDetails'; // Import ViewOrderDetails
import AddressPage from './components/AddressPage'; // Import AddressPage
import NotificationsPage from './components/NotificationsPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect root to login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<NikePage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/view" element={<ViewPage />} /> {/* Add ViewPage route */}
        <Route path="/viewpage" element={<ViewPage />} /> {/* Add ViewPage route */}
        <Route path="/admin" element={<AdminPage />} /> {/* Add AdminPage route */}
        <Route path="/edit-profile" element={<EditProfilePage />} /> {/* Add EditProfilePage route */}
        <Route path="/cart" element={<CartPage />} /> {/* Add CartPage route */}
        <Route path="/checkout" element={<CheckoutPage />} /> {/* Add CheckoutPage route */}
        <Route path="/reviews" element={<ProductReviewPage />} /> {/* Add ProductReviewPage route */}
        <Route path="/shipping" element={<ShippingPage />} /> {/* Add ShippingPage route */}
        <Route path="/admin/users" element={<AdminUserPage />} /> {/* Add AdminUserPage route */}
        <Route path="/admin/orders-page" element={<AdminOrderPage />} /> {/* Add AdminOrderPage route */}
        <Route path="/view-order-details" element={<ViewOrderDetails />} /> {/* Add ViewOrderDetails route */}
        <Route path="/address" element={<AddressPage />} /> {/* Add AddressPage route */}
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
