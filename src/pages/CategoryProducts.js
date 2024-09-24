import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getRelatedProducts } from '../api';
import { motion } from 'framer-motion';

const ProductCard = lazy(() => import('./ProductCard')); // Lazy loading ProductCard

const CategoryProducts = () => {
  const { category } = useParams(); // Get category from URL params
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch related products excluding product with ID 1
        const fetchedProducts = await getRelatedProducts(category, 1);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]); // Dependency array includes category

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Products in {category}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : products.length > 0 ? (
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Suspense fallback={<CircularProgress />}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              </Suspense>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No products found in this category.</Typography>
      )}
    </div>
  );
};

export default CategoryProducts;
