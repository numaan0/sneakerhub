import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  TextField,
  Grid,
  Typography,
} from '@mui/material';
import { FaSave, FaTimes } from 'react-icons/fa';
import { SERVERURL, getOrderById } from '../api';

const statusOptions = ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

const OrderDetailsDialog = ({ open, onClose, orderId, onSave }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState('');

  useEffect(() => {
    if (open && orderId) {
      setLoading(true);
      setError(null);
      
      // Fetch order details by ID
      getOrderById(orderId)
        .then((order) => {
          setOrderDetails(order);
          setUpdatedStatus(order.status); // Set the initial status
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to load order details');
          setLoading(false);
        });
    }
  }, [open, orderId]);

  const handleSave = () => {
    const updatedOrder = { ...orderDetails, status: updatedStatus };
    onSave(orderId, updatedStatus); // Call the onSave function with the updated order
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent>
        {loading ? (
          <Typography>Loading order details...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : orderDetails ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Order #{orderDetails.id}</Typography>
              <Typography variant="body2">
                Customer: {orderDetails.user.firstName} {orderDetails.user.lastName}
              </Typography>
              <Typography variant="body2">
                Total: ₹{orderDetails.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
              </Typography>
              <Typography variant="body2">
                Date: {new Date(orderDetails.date).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Status"
                fullWidth
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Order Items:</Typography>
              {orderDetails.orderItems.map((item, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <Typography variant="body2">
                    {item.productName} - ₹{item.price} x {item.quantity}
                  </Typography>
                </div>
              ))}
            </Grid>
          </Grid>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          startIcon={<FaTimes />}
          onClick={onClose}
          color="secondary"
        >
          Close
        </Button>
        <Button
          startIcon={<FaSave />}
          onClick={handleSave}
          color="primary"
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailsDialog;
