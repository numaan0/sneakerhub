import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, List, ListItem, ListItemText, Divider, Box, Avatar } from '@mui/material';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = 2321; // Replace with actual value
  const finalPrice = totalPrice - discount;

  const handleCheckout = () => {
    console.log('Proceed to checkout');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            From Saved Addresses
          </Typography>
          <List>
            {cartItems.map(item => (
              <React.Fragment key={item.id}>
                <ListItem alignItems="flex-start">
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Avatar
                        variant="square"
                        src={item.thumbnail}
                        alt={item.title}
                        sx={{ width: '100%', height: 'auto', borderRadius: 2 }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <ListItemText
                        primary={item.title}
                        secondary={`Size: ${item.size || 'N/A'}`}
                        primaryTypographyProps={{ variant: 'h6' }}
                      />
                      <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                        {item.availabilityStatus}
                      </Typography>
                      <Button variant="outlined" color="primary" size="small" sx={{ mt: 2, mr: 1 }}>
                        Save For Later
                      </Button>
                      <Button variant="outlined" color="error" size="small" sx={{ mt: 2 }}>
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              PRICE DETAILS
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="body1">Price ({cartItems.length} items)</Typography>
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
              Place Order
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
