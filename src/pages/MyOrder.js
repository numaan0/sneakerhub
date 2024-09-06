import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, List, ListItem, ListItemText, Divider, Box, Avatar } from '@mui/material';
import { getOrdersByUserId } from '../api'; // Make sure to implement this API call
import { useAuth } from '../context/AuthContext';
import { SERVERURL } from './../api';

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
        getOrdersByUserId(user.id).then(response => {
        setOrders(response);
      }).catch(error => {
        console.error('Error fetching orders:', error);
      });
    }
  }, [user]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      <List>
        {orders.length > 0 ? (
          orders.map(order => (
            <React.Fragment key={order.id}>
              <ListItem alignItems="flex-start">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      Order ID: {order.id}
                    </Typography>
                    <Typography variant="body1">
                      Status: {order.status}
                    </Typography>
                    <Typography variant="body2">
                      Placed on: {new Date(order.createdAt).toLocaleDateString()}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    {order.orderItems.map(item => (
                      <Box key={item.id} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Avatar
                          variant="square"
                          src={SERVERURL + item.product?.imageUrl}
                          alt={item.name}
                          sx={{ width: 56, height: 56, borderRadius: 2 }}
                        />
                        <ListItemText
                          primary={item.name}
                          secondary={`Quantity: ${item.quantity}`}
                          primaryTypographyProps={{ variant: 'h6' }}
                          sx={{ flex: 1, ml: 2 }}
                        />
                        <Typography variant="body2">
                          Price: ${item.price}
                        </Typography>
                      </Box>
                    ))}
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography variant="body1">
            You have no orders.
          </Typography>
        )}
      </List>
    </Container>
  );
};

export default MyOrders;
