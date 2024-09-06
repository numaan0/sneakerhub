import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, List, ListItem, ListItemText, Divider, Box, Avatar } from '@mui/material';
import { fetchCartByUserId, removeItemFromCart, clearCart } from '../api';
import { useAuth } from '../context/AuthContext';
import { SERVERURL } from './../api';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      fetchCartByUserId(user.id).then(cart => {
        console.log(cart.data.items)
        setCartItems(cart.data.items);
        console.log(cartItems,"The cart items")
      }).catch(error => {
        console.error('Error fetching cart:', error);
      });
    }
  }, [user]);
  
  const totalPrice = cartItems?.length>0? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0): 0;
  const discount = 0; // Replace with actual value
  const finalPrice = totalPrice - discount;

  const handleRemoveItem = async (cartItemId) => {
    try {
      await removeItemFromCart(user.id, cartItemId);
      setCartItems(cartItems.filter(item => item.id !== cartItemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleCheckout = () => {
    console.log('Proceed to checkout');
    navigate('/checkout', { state: { cartItems } });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            From Saved Addresses
          </Typography>
          <List>

            {
              cartItems?.length > 0 ?
              (cartItems.map(item => (
                <React.Fragment key={item.id}>
                  <ListItem alignItems="flex-start">
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Avatar
                          variant="square"
                          src={SERVERURL+item.product.imageUrl}
                          alt={item.product.name}
                          sx={{ width: '100%', height: 'auto', borderRadius: 2 }}
                        />
                      </Grid>
                      <Grid item xs={8}>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <ListItemText
                          primary={item.product.name}
                          secondary={`Size: ${item.size || 'N/A'}`}
                          primaryTypographyProps={{ variant: 'h6' }}
                          sx={{ flex: 1 }}
                        />
                        <ListItemText
                          primary={item.product.category}
                          secondary={`By Seller: ${item.product.seller.username || 'N/A'}`}
                          primaryTypographyProps={{ variant: 'h6' }}
                          sx={{ flex: 1 }}
                        />
                      </Box>
                      <Box display="flex" justifyContent="space-between" alignItems="center">

                        <Typography variant="body2" color="green" sx={{ mt: 1, flex: 1 }}>
                          {item.availabilityStatus || "Available"}
                        </Typography>
                        <Typography variant="body2" color="green" sx={{ mt: 1, flex: 1 }}>
                          {"Added: "+item.quantity || "1" +" Items"}
                        </Typography>
                      </Box>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          sx={{ mt: 2, mr: 1 }}
                          onClick={() => console.log('Save for later')}
                        >
                          Save For Later
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          sx={{ mt: 2 }}
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remove
                        </Button>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))):(<p>No Items available.</p>)}   
          </List>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              PRICE DETAILS
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="body1">Price ({cartItems?.length} items)</Typography>
              <Typography variant="body1">₹{totalPrice}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="body1">Discount</Typography>
              <Typography variant="body1" color="green">-₹{discount}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="body1">Delivery Charges</Typography>
              <Typography variant="body1" color="green">Free</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">Total Amount</Typography>
              <Typography variant="h6">₹{finalPrice}</Typography>
            </Box>
            <Typography variant="body2" color="green">
              You will save ₹{discount} on this order
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              onClick={handleCheckout}
            >
              Proceed To Checkout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
