import React, { useState } from 'react';
import { Container, Grid, TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { createOrder } from './../api';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = location.state || { cartItems: [] }; // Access cart items from state
  const {user} =useAuth();
  const userId = user.id;
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: '',
    mobileNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare order data
    const orderData = {
      customerName: formData.fullName,
      address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.zipCode}, ${formData.country}`,
      mobileNumber: formData.mobileNumber, // Add logic to collect mobile number if required
      totalAmount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      orderItems: cartItems.map(item => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        sellerId: item.product.seller.id,
      })),
      paymentMethod: formData.paymentMethod,
    };

    try {
      const response = await createOrder(orderData, userId);
      console.log('Order successfully created:', response);

      // Redirect to the order confirmation page
      navigate('/order-confirmation', { state: { order: response } });
    } catch (error) {
      console.error('Failed to create order:', error);
      // Handle the error, e.g., show an error message
    }
  };

//   const createOrder = async (order, userId) => {
//     const API_BASE_URL = 'https://your-api-url.com/api/orders';
//     try {
//       const response = await axios.post(API_BASE_URL, order, { params: { userId } });
//       return response.data;
//     } catch (error) {
//       console.error('Create order error:', error.response ? error.response.data : error.message);
//       throw error;
//     }
//   };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mobile Number"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Zip Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Payment Method</InputLabel>
              <Select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <MenuItem value="creditCard">Credit Card</MenuItem>
                <MenuItem value="debitCard">Debit Card</MenuItem>
                <MenuItem value="paypal">PayPal</MenuItem>
                <MenuItem value="cod">Cash on Delivery</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" type="submit">
                Place Order
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Checkout;
