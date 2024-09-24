import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, IconButton, Menu, MenuItem, Box, Badge } from '@mui/material';
import { FaSearch, FaShoppingCart, FaUser, FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginDialog from './LoginDialog';
import { useNavigate } from 'react-router-dom';
import { fetchCartByUserId } from '../api';
import { useCart } from '../context/CartContext';
import CategoryChips from './CategoryChips';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user, handleLogout } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    if (user && user.userType === 'customer') {
      fetchCartByUserId(user.id)
        .then(cart => {
          setCartItemCount(cart.data.items.length);
        })
        .catch(error => {
          console.error('Error fetching cart:', error);
        });
    }
  }, [user]);

  const handleDialogOpen = (isLogin) => {
    setIsLogin(isLogin);
    setOpenDialog(true);
  };

  const onLogout = () => {
    handleLogout(navigate);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <Toolbar className="flex items-center justify-between">
        <Typography variant="h6" className="flex-grow-0 mr-4">
          <Link to="/" className="text-white no-underline hover:underline flex items-center">
            SneakerHub
          </Link>
        </Typography>

        <div className="relative flex items-center rounded-sm flex-grow mx-4">
          <TextField
            variant="outlined"
            placeholder="Search for Products, Brands and More"
            InputProps={{
              style: { backgroundColor: 'white', color: 'black' },
              startAdornment: (
                <IconButton>
                  <FaSearch className="text-gray-400" />
                </IconButton>
              ),
            }}
            fullWidth
            className="bg-transparent"
          />
        </div>

        {user ? (
          <>
            <Button color="inherit" className="text-white flex items-center" onClick={handleMenuOpen}>
              {user.username} <FaAngleDown className="ml-1" />
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              {user.userType === 'customer' ? (
                <>
                  <MenuItem component={Link} to="/account" onClick={handleMenuClose}>
                    My Profile
                  </MenuItem>
                  <MenuItem component={Link} to="/my-orders" onClick={handleMenuClose}>
                    Orders
                  </MenuItem>
                  <MenuItem component={Link} to="/wishlist" onClick={handleMenuClose}>
                    Wishlist
                  </MenuItem>
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem component={Link} to="/seller-dashboard" onClick={handleMenuClose}>
                    Dashboard
                  </MenuItem>
                  <MenuItem component={Link} to="/account" onClick={handleMenuClose}>
                    My Profile
                  </MenuItem>
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            className="bg-yellow-500 text-black hover:bg-yellow-600 mr-4"
            onClick={() => handleDialogOpen(true)}
          >
            Login
          </Button>
        )}

        {user?.userType === 'customer' && (
          <>
            <IconButton color="inherit" component={Link} to="/cart" className="mr-4">
              <Badge badgeContent={cartItems?.length || 0} color="secondary">
                <FaShoppingCart />
              </Badge>
            </IconButton>
            <Button color="inherit" className="text-white mr-4">
              Become a Seller
            </Button>
          </>
        )}
      </Toolbar>
      <hr style={{ 
      backgroundColor: 'white', 
      height: '2px', 
      border: 'none', 
      margin: '20px 0' 
    }} />
      <CategoryChips />

      <LoginDialog open={openDialog} onClose={handleDialogClose} isLogin={isLogin} setIsLogin={setIsLogin} />
    </AppBar>
  );
};

export default Navbar;
