import React, { useState } from 'react';
import { Card, CardContent, Button, Typography, Grid, IconButton } from '@mui/material';
import { FaUsers, FaBoxOpen, FaShoppingCart, FaUserSlash, FaEye } from 'react-icons/fa';

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', type: 'Seller', status: 'Active' },
    { id: 2, name: 'Jane Smith', type: 'Customer', status: 'Active' },
    { id: 3, name: 'Bob Johnson', type: 'Seller', status: 'Suspended' },
  ]);

  const [orders, setOrders] = useState([
    { id: 1, customer: 'Jane Smith', total: 150.00, status: 'Delivered' },
    { id: 2, customer: 'Alice Brown', total: 75.50, status: 'Processing' },
    { id: 3, customer: 'Charlie Davis', total: 200.25, status: 'Shipped' },
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', price: 999.99, seller: 'John Doe' },
    { id: 2, name: 'Smartphone', price: 499.99, seller: 'Bob Johnson' },
    { id: 3, name: 'Headphones', price: 79.99, seller: 'John Doe' },
  ]);

  const handleViewUserDetails = (userId) => {
    console.log(`Viewing details for user ${userId}`);
    // Implement view user details logic
  };

  const handleSuspendAccount = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: user.status === 'Active' ? 'Suspended' : 'Active' } : user
    ));
  };

  const handleDeleteAccount = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleViewOrderDetails = (orderId) => {
    console.log(`Viewing details for order ${orderId}`);
    // Implement view order details logic
  };

  const handleViewProductDetails = (productId) => {
    console.log(`Viewing details for product ${productId}`);
    // Implement view product details logic
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Typography variant="h4" className="font-bold mb-6 text-gray-800">
        Admin Dashboard
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card className="shadow-lg">
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" className="font-semibold text-gray-700">
                  User Management
                </Typography>
                <FaUsers className="text-gray-500 text-xl" />
              </div>
              <div className="space-y-2 h-48 overflow-y-scroll">
                {users.map(user => (
                  <div key={user.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <Typography className="text-gray-700">{user.name}</Typography>
                      <Typography variant="body2" className="text-gray-500">
                        {user.type} - {user.status}
                      </Typography>
                    </div>
                    <div>
                      <IconButton color="primary" onClick={() => handleViewUserDetails(user.id)}>
                        <FaEye />
                      </IconButton>
                      <IconButton color="warning" onClick={() => handleSuspendAccount(user.id)}>
                        <FaUserSlash />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteAccount(user.id)}>
                        <FaUserSlash />
                      </IconButton>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="shadow-lg">
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" className="font-semibold text-gray-700">
                  Order Management
                </Typography>
                <FaShoppingCart className="text-gray-500 text-xl" />
              </div>
              <div className="space-y-2 h-48 overflow-y-scroll">
                {orders.map(order => (
                  <div key={order.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <Typography className="text-gray-700">Order #{order.id}</Typography>
                      <Typography variant="body2" className="text-gray-500">
                        Customer: {order.customer}
                      </Typography>
                      <Typography variant="body2" className="text-gray-500">
                        Total: ₹{order.total.toFixed(2)} - {order.status}
                      </Typography>
                    </div>
                    <Button variant="contained" color="primary" size="small" onClick={() => handleViewOrderDetails(order.id)}>
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className="shadow-lg">
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" className="font-semibold text-gray-700">
                  Product Management
                </Typography>
                <FaBoxOpen className="text-gray-500 text-xl" />
              </div>
              <div className="space-y-2 h-48 overflow-y-scroll">
                {products.map(product => (
                  <div key={product.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <Typography className="text-gray-700">{product.name}</Typography>
                      <Typography variant="body2" className="text-gray-500">
                        Price: ₹{product.price.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" className="text-gray-500">
                        Seller: {product.seller}
                      </Typography>
                    </div>
                    <Button variant="contained" color="primary" size="small" onClick={() => handleViewProductDetails(product.id)}>
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className="shadow-lg">
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" className="font-semibold text-gray-700">
                  Dashboard Overview
                </Typography>
              </div>
              <div className="flex justify-around items-center">
                <div className="text-center">
                  <Typography variant="h5" className="font-bold text-blue-600">
                    {users.length}
                  </Typography>
                  <Typography className="text-gray-500">Total Users</Typography>
                </div>
                <div className="text-center">
                  <Typography variant="h5" className="font-bold text-blue-600">
                    {orders.length}
                  </Typography>
                  <Typography className="text-gray-500">Total Orders</Typography>
                </div>
                <div className="text-center">
                  <Typography variant="h5" className="font-bold text-blue-600">
                    {products.length}
                  </Typography>
                  <Typography className="text-gray-500">Total Products</Typography>
                </div>
                <div className="text-center">
                  <Typography variant="h5" className="font-bold text-blue-600">
                    ₹{orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                  </Typography>
                  <Typography className="text-gray-500">Total Sales</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;