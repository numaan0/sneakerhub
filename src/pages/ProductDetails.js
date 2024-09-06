import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Button, Card, CardMedia, Box } from '@mui/material';
import { fetchProductById, addItemToCart, SERVERURL } from '../api';
import { useAuth } from '../context/AuthContext';
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const {user} = useAuth();
  const userId = user.id;
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetchProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    if (!product) return; // Prevent adding to cart if no product

    try {
      // const userId = 1; // Replace with actual user ID
      await addItemToCart(userId, product.id, quantity);
      navigate('/cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  if (!product) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Product not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={SERVERURL + product.imageUrl}
              alt={product.name}
              className="object-cover"
            />
            {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
              {product.additionalImages.map((img, idx) => (
                <img
                  key={idx}
                  src={SERVERURL + img}
                  alt={`Product ${idx}`}
                  style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                />
              ))}
            </Box> */}
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            ₹{product.price} <span style={{ textDecoration: 'line-through', color: 'red' }}>₹{(product.price / (1 - product.discount / 100)).toFixed(0)}</span> ({product.discount}% off)
          </Typography>
          <Typography variant="body1" gutterBottom>
            {product.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Brand: {product.brand}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Rating: {product.rating} ({product.reviewsCount} reviews)
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={addToCart}
              sx={{ width: '100%', mt: 2 }}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
