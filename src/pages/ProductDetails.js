import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Button, Card, CardMedia, Box } from '@mui/material';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Dummy product data (replace with API data later)
  const products = [
    {
      id: 1,
      title: 'Synthetic Leather Sneakers',
      price: 299,
      discount: 85,
      thumbnail: '/path/to/image1.jpg',
      description: 'Lightweight and comfortable sneakers for daily use.',
      availabilityStatus: 'In Stock',
      brand: 'Aadi',
      rating: 3.6,
      reviewsCount: 136101,
      additionalImages: ['/path/to/image2.jpg', '/path/to/image3.jpg'],
    },
    // Add more products as needed
  ];

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchedProduct = products.find(p => p.id === parseInt(productId));
    setProduct(fetchedProduct);
  }, [productId]);

  const addToCart = () => {
    if (!product) return; // Prevent adding to cart if no product

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ ...product, quantity });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    navigate('/cart');
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
              image={product.thumbnail}
              alt={product.title}
              className="object-cover"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
              {product.additionalImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Product ${idx}`}
                  style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                />
              ))}
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.title}
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
