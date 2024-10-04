import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Avatar,
} from '@mui/material';
import { FaSave, FaTimes } from 'react-icons/fa';
import { SERVERURL } from '../api';
import { useAuth } from '../context/AuthContext';
const categories = [
  'Sneakers',
  'Casual',
  'Lows',
  // Add more categories as needed
];

const AddProductDialog = ({ open, onClose, onSave, editingProduct }) => {

  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image: null,
    imagePreview: null,
    stock: '',
    seller: '',
  });

  const {user} = useAuth();

  useEffect(() => {
    if (open) {
      if (editingProduct) {
        setProduct({
          name: editingProduct.name || '',
          description: editingProduct.description || '',
          category: editingProduct.category || '',
          price: editingProduct.price || '',
          image: null,
          imagePreview: editingProduct.imageUrl ? SERVERURL + editingProduct.imageUrl : null,
          stock: editingProduct.stock || '',
          seller: editingProduct.seller?.id || '',
        });
      } else {
        // Reset to default values when opening the dialog for adding a new product
        setProduct({
          name: '',
          description: '',
          category: '',
          price: '',
          image: null,
          imagePreview: null,
          stock: '',
          seller: '',
        });
      }
    }
  }, [open, editingProduct]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setProduct((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('category', product.category);
    formData.append('price', product.price);
    formData.append('stock', product.stock);
    formData.append('seller_id', user.id);

    if (product.image) {
      formData.append('image', product.image);
    }

    onSave(formData, editingProduct?.id);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {editingProduct ? 'Edit Product' : 'Add New Product'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Avatar
              src={product.imagePreview}
              alt="Product Image"
              sx={{ width: 150, height: 150, marginBottom: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange}
              style={{ display: 'block', margin: '0 auto' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Product Name"
              name="name"
              fullWidth
              value={product.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              multiline
              rows={3}
              fullWidth
              value={product.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Category"
              name="category"
              fullWidth
              value={product.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              name="price"
              type="number"
              fullWidth
              value={product.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Stock Quantity"
              name="stock"
              type="number"
              fullWidth
              value={product.stock}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          startIcon={<FaTimes />}
          onClick={onClose}
          color="secondary"
        >
          Cancel
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

export default AddProductDialog;
