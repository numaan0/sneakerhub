import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { SERVERURL } from '../api';
import { motion } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';

const ProductCard = ({ product }) => {
  const rating = Math.floor(product.rating); 
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card
        className="shadow-lg w-64 flex flex-col transform transition-transform duration-300 ease-in-out hover:scale-110 overflow-hidden hover:shadow-2xl "
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <div className="h-48 w-full">
          <CardMedia
            component="img"
            height="100%"
            width="100%"
            image={SERVERURL + product.imageUrl}
            alt={product.name}
            className="object-cover h-full w-full"
          />
        </div>
        <CardContent className="flex flex-col flex-grow p-6 justify-center text-center">
          <Typography gutterBottom variant="h5" component="div" className="truncate">
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" className="mb-2">
            ₹ {product.price}/-
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mb-4">
            {product.brand} <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {Array.from({ length: rating }, (_, index) => (
                <StarIcon key={index} style={{ color: 'gold' }} />
              ))}
            </div>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white mt-auto"
            to={`/products/${product.id}`}
          
            style={{
              borderRadius: '24px',
              padding: '8px 24px',
            }}
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
