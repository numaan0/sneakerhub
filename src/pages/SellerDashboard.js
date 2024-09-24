import React, { useEffect, useState } from 'react';
import { Card, CardContent, Button, Typography, Grid, IconButton } from '@mui/material';
import { FaPlus, FaEdit, FaTrash, FaBoxOpen, FaChartLine, FaUserCog } from 'react-icons/fa';
import AddProductDialog from '../components/AddProductDialog';
import { addProduct, getProductsBySeller, deleteProduct, getOrderBySellerId, updateOrderStatus} from '../api';
import OrderDetailsDialog from '../components/OrderDetail';
import { toast } from 'react-toastify';

const SellerDashboard = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [orderError, setOrderError] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));
    const sellerId = user?.id;
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [isOrderDialogOpen, setOrderDialogOpen] = useState(false);


    const getTotalSales = () => {
        return orders.reduce((total, order) => {
          const orderTotal = order.orderItems.reduce((orderSum, item) => {
            return orderSum + (item.price * item.quantity);
          }, 0);
          return total + orderTotal;
        }, 0);
      };
      
      const totalSales = getTotalSales();

    const loadProducts = async () => {
        if (sellerId) {
            try {
                const response = await getProductsBySeller(sellerId);
                setProducts(response);
            } catch (err) {
                setError('Failed to fetch products.');
                toast.error('Fetch products error:', err);
            } finally {
                setLoading(false);
            }
        } else {
            setError('Seller ID not found in local storage.');
            setLoading(false);
        }
    };

    const loadOrders = async () => {
        if (sellerId) {
            try {
                setLoadingOrders(true);
                const response = await getOrderBySellerId(sellerId);
                setOrders(response);
                setOrderError(null);
            } catch (err) {
                setOrderError('Failed to fetch orders.');
                toast.error('Fetch orders error:', err);
            } finally {
                setLoadingOrders(false);
            }
        } else {
            setOrderError('Seller ID not found in local storage.');
            setLoadingOrders(false);
        }
    };

    useEffect(() => {
        loadProducts();
        loadOrders();
    }, [sellerId]);

    const handleOpenDialog = (product) => {
        setEditingProduct(product);
        setOpenDialog(true);
    };

    const handleOrderCloseDialog = () => {
        setOrderDialogOpen(false);
        setEditingProduct(null);
    };
    const handleDeleteProduct = async(id) =>{
        try{
            if(id){
                await deleteProduct(id);
                toast.success('Product updated successfully!')
            }
            await loadProducts();
        }catch (error) {
            toast.error('Failed to Delete product. Please try again.');
            setEditingProduct(null);
            toast.error('delete product error:', error.response ? error.response.data : error.message);
    }
}
    const handleSaveProduct = async (formData) => {
        try {
            if (editingProduct) {
                // Update product if editing
                await addProduct(formData, editingProduct.id); // Assuming `addProduct` can handle updates with an ID
                toast.success('Product updated successfully!');
                setEditingProduct(null);
            } else {
                await addProduct(formData);
                toast.success('Product added successfully!');
                setEditingProduct(null);
            }
            await loadProducts();
        } catch (error) {
            toast.error('Failed to save product. Please try again.');
            setEditingProduct(null);
            toast.error('Save product error:', error.response ? error.response.data : error.message);
        }
    };

    const handleEditProduct = (product) => {
        handleOpenDialog(product);
    };

    const handleViewDetails = (orderId) => {
        setSelectedOrderId(orderId);
        setOrderDialogOpen(true);
      };
    

    const handleCloseDialog = () => {
        setOpenDialog(false);
        // setSelectedOrderId(null);
      };

      const handleSaveOrder = (orderId, status) => {
        // onUpdateOrder(updatedOrder);
        updateOrderStatus(orderId, status)
      };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Typography variant="h4" className="font-bold mb-6 text-gray-800">
                Seller Dashboard
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card className="shadow-lg">
                        <CardContent>
                            <div className="flex justify-between items-center mb-4">
                                <Typography variant="h6" className="font-semibold text-gray-700">
                                    Product Management
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<FaPlus />}
                                    onClick={() => handleOpenDialog(null)}
                                    className="bg-blue-600"
                                >
                                    Add Product
                                </Button>
                            </div>
                            <div className="space-y-2 h-48 overflow-y-scroll">
                                {loading ? (
                                    <Typography>Loading products...</Typography>
                                ) : error ? (
                                    <Typography color="error">{error}</Typography>
                                ) : (
                                    products.map(product => (
                                        <div key={product.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                            <Typography className="text-gray-700">{product.name}</Typography>
                                            <div>
                                                <IconButton color="primary" onClick={() => handleEditProduct(product)}>
                                                    <FaEdit />
                                                </IconButton>
                                                <IconButton color="secondary" onClick={() => handleDeleteProduct(product.id)}>
                                                    <FaTrash />
                                                </IconButton>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
{/* Old Order manangement */}
                {/* <Grid item xs={12} md={6}>
                    <Card className="shadow-lg">
                        <CardContent>
                            <div className="flex justify-between items-center mb-4">
                                <Typography variant="h6" className="font-semibold text-gray-700">
                                    Order Management
                                </Typography>
                                <FaBoxOpen className="text-gray-500 text-xl" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                    <Typography className="text-gray-700">Order #12345</Typography>
                                    <Button variant="contained" color="primary" size="small">
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid> */}
{/* till here */}


            <Grid item xs={12} md={6}>
                    <Card className="shadow-lg">
                        <CardContent>
                            <div className="flex justify-between items-center mb-4">
                                <Typography variant="h6" className="font-semibold text-gray-700">
                                    Order Management
                                </Typography>
                                <FaBoxOpen className="text-gray-500 text-xl" />
                            </div>
                            <div className="space-y-2 h-48 overflow-y-scroll">
                                {loadingOrders ? (
                                    <Typography>Loading orders...</Typography>
                                ) : orderError ? (
                                    <Typography color="error">{orderError}</Typography>
                                ) : orders.length === 0 ? (
                                    <Typography>No orders found.</Typography>
                                ) : (
                                    orders.map(order => (
                                        <div key={order.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                            <div>
                                                <Typography className="text-gray-700">Order #{order.id}</Typography>
                                                <Typography variant="body2" className="text-gray-500">
                                                    Customer: {order.user.firstName} {order.user.lastName}
                                                </Typography>
                                                <Typography variant="body2" className="text-gray-500">
                                                    Total: ₹{order.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                                                </Typography>
                                            </div>
                                            <Button variant="contained" color="primary" size="small" onClick={() => handleViewDetails(order.id)}>
                                                View Details
                                            </Button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card className="shadow-lg">
                        <CardContent>
                            <div className="flex justify-between items-center mb-4">
                                <Typography variant="h6" className="font-semibold text-gray-700">
                                    Sales Overview
                                </Typography>
                                <FaChartLine className="text-gray-500 text-xl" />
                            </div>
                            <div className="flex justify-around items-center">
                                <div className="text-center">
                                    <Typography variant="h5" className="font-bold text-blue-600">
                                    ₹{totalSales.toFixed(2)}
                                    </Typography>
                                    <Typography className="text-gray-500">Total Sales</Typography>
                                </div>
                                <div className="text-center">
                                    <Typography variant="h5" className="font-bold text-blue-600">
                                    {orders?.length || 0}
                                    </Typography>
                                    <Typography className="text-gray-500">Orders</Typography>
                                </div>
                                <div className="text-center">
                                    <Typography variant="h5" className="font-bold text-blue-600">
                                        {products?.length || 0}
                                    </Typography>
                                    <Typography className="text-gray-500">Products</Typography>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>

                {/* <Grid item xs={12}>
                    <Card className="shadow-lg">
                        <CardContent>
                            <div className="flex justify-between items-center mb-4">
                                <Typography variant="h6" className="font-semibold text-gray-700">
                                    Profile Settings
                                </Typography>
                                <FaUserCog className="text-gray-500 text-xl" />
                            </div>
                            <Button variant="contained" color="primary" className="bg-blue-600 mr-2">
                                Manage Account
                            </Button>
                            <Button variant="contained" color="secondary">
                                Payment Details
                            </Button>
                        </CardContent>
                    </Card>
                </Grid> */}
            </Grid>

            <AddProductDialog
                open={openDialog}
                onClose={handleCloseDialog}
                onSave={handleSaveProduct}
                editingProduct={editingProduct}
            />
            <OrderDetailsDialog
                open={isOrderDialogOpen}
                onClose={handleOrderCloseDialog}
                orderId={selectedOrderId}
                onSave={handleSaveOrder}
            />
        </div>
    );
};

export default SellerDashboard;
