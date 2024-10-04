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
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import MyOrders from './pages/MyOrder';
import { CartProvider } from './context/CartContext';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './services/PrivateRoute';
import CategoryProducts from './pages/CategoryProducts';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<PrivateRoute element={<Account />} />} /> 
        <Route path="/seller-dashboard" element={<PrivateRoute element={<SellerDashboard />} />} /> 
        <Route path="/admin-dashboard" element={<PrivateRoute element={<AdminDashboard />} />} /> 
        <Route path="/checkout" element={<PrivateRoute element={<Checkout />} />} /> 
        <Route path="/order-confirmation" element={<PrivateRoute element={<OrderConfirmation />} />} /> 
        <Route path="/my-orders" element={<PrivateRoute element={<MyOrders />} />} /> 
        <Route path="/admin-dashboard" element={<PrivateRoute element={<AdminDashboard />} />} />
        <Route path="/products/category/:category" element={<PrivateRoute element={<CategoryProducts />} />} />
        </Routes>
        <ToastContainer /> 
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
