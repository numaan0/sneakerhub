import React, { useEffect } from 'react';
import { Container, Typography, Button, Grid, List, ListItem, ListItemText, Divider, Box, Avatar, CircularProgress } from '@mui/material';
import { useCart } from '../context/CartContext';
import { SERVERURL } from './../api';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, totalPrice, discount, finalPrice, handleRemoveItem, isLoading, fetchCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems } });
  };

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            From Saved Addresses
          </Typography>
          <List>
            {cartItems?.length > 0 ? (
              cartItems.map(item => (
                <React.Fragment key={item.id}>
                  <ListItem alignItems="flex-start">
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Avatar
                          variant="square"
                          src={SERVERURL + item.product.imageUrl}
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
                            {"Added: " + item.quantity || "1" + " Items"}
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
              ))
            ) : (
              <Typography variant="body1">No Items available.</Typography>
            )}
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
              disabled={cartItems.length === 0}
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