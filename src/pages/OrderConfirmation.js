import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    
    navigate('/'); // Redirect to products page
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order Confirmation
      </Typography>
      <Typography variant="body1" gutterBottom>
        Thank you for your order! Your order has been placed successfully.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleContinueShopping}>
        Continue Shopping
      </Button>
    </Container>
  );
};

export default OrderConfirmation;
