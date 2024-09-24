import React, { useState, useEffect } from 'react';
import { Chip, Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../api';

const CategoryChips = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/products/category/${category}`); // Navigate to CategoryProducts page
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" gutterBottom style={{ color: 'white' }}>
        Shop by Categories
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              variant="outlined"
              onClick={() => handleCategoryClick(category)}
              sx={{
                m: 1,
                color: 'white', // Set text color to white
                borderColor: 'white', // Set border color to white
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CategoryChips;
