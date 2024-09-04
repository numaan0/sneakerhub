import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Account from './pages/Account';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import SellerDashboard from './pages/SellerDashboard';

function App() {
  return (
    <AuthProvider> {/* Wrap your app with AuthProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
        </Routes>
        <ToastContainer /> 
      </Router>
    </AuthProvider>
  );
}

export default App;
