import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Button, Card, CardMedia, Box } from '@mui/material';
import { fetchProductById, addItemToCart, SERVERURL, getRelatedProducts } from '../api';
import { useAuth } from '../context/AuthContext';
import ProductCard from './ProductCard';
import StarIcon from '@mui/icons-material/Star';
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const userId = user.id;
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetchProductById(id);
        // const rating = response.data.rating
        setProduct(response.data);

        // Fetch related products
        const relatedProductsResponse = await getRelatedProducts(response.data.category, response.data.id);
        setRelatedProducts(relatedProductsResponse.slice(0, 10));
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    if (!product) return;

    try {
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
            Rating: {Array.from({ length: product.rating }, (_, index) => (
                <StarIcon key={index} style={{ color: 'gold' }} />
              ))} ({product.reviewsCount} reviews)
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              color="primary"
              onClick={addToCart}
              sx={{ width: '100%', mt: 2 }}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Recommendation section */}
{relatedProducts.length > 0 && (
  <Box sx={{ mt: 4 }}>
    <Typography variant="h5" gutterBottom>
      You might also like
    </Typography>
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        gap: 2,
        pb: 2,  
      }}
    >
      {relatedProducts.map((product) => (
        <Box key={product.id} sx={{ flex: '0 0 auto', width: '250px' }}>
          <ProductCard product={product} />
        </Box>
      ))}
    </Box>
  </Box>
)}
    </Container>
  );
};

export default ProductDetails;