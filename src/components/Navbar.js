import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, IconButton, Menu, MenuItem } from '@mui/material';
import { FaSearch, FaShoppingCart, FaUser, FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginDialog from './LoginDialog';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

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
    <AppBar position="static" className="bg-white text-black">
      <Toolbar className="flex items-center justify-between">
        <Typography variant="h6" className="flex-grow-0 mr-4">
          <Link to="/" className="text-black no-underline hover:underline flex items-center">
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
            {user.userType === 'customer' ? (
              <>
                <Button color="inherit" className="text-black flex items-center" onClick={handleMenuOpen}>
                  {user.username} <FaAngleDown className="ml-1" />
                </Button>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  <MenuItem component={Link} to="/account" onClick={handleMenuClose}>My Profile</MenuItem>
                  <MenuItem component={Link} to="/orders" onClick={handleMenuClose}>Orders</MenuItem>
                  <MenuItem component={Link} to="/wishlist" onClick={handleMenuClose}>Wishlist</MenuItem>
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" className="text-black flex items-center" onClick={handleMenuOpen}>
                  {user.username} <FaAngleDown className="ml-1" />
                </Button>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  <MenuItem component={Link} to="/seller-dashboard" onClick={handleMenuClose}>Dashboard</MenuItem>
                  <MenuItem component={Link} to="/account" onClick={handleMenuClose}>My Profile</MenuItem>
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </>
        ) : (
          <Button variant="contained" color="primary" className="bg-blue-600 text-white hover:bg-blue-700 mr-4" onClick={() => handleDialogOpen(true)}>
            Login
          </Button>
        )}

        {user?.userType === 'customer' && (
          <>
            <IconButton color="inherit" component={Link} to="/cart" className="mr-4">
              <FaShoppingCart />
              <span className="ml-1">Cart</span>
            </IconButton>
            <Button color="inherit" className="text-black mr-4">
              Become a Seller
            </Button>
          </>
        )}
      </Toolbar>

      <LoginDialog open={openDialog} onClose={handleDialogClose} isLogin={isLogin} setIsLogin={setIsLogin} />
    </AppBar>
  );
};

export default Navbar;
