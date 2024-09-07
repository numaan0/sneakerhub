import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { SERVERURL } from '../api';
const ProductCard = ({ product }) => {
  // console.log(product)
  // console.log(SERVERURL+product.imageUrl)
  
  return (
    <Card className="shadow-md w-64 flex flex-col">
      <div className="h-40 w-full">
    <CardMedia
      component="img"
      height="100%"
      width="100%"
      image={SERVERURL + product.imageUrl}
      alt={product.name}
      className="object-cover h-full w-full"
    />
  </div>
      <CardContent className="flex flex-col flex-grow p-4">
        <Typography gutterBottom variant="h6" component="div" className="truncate">
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" className="mb-2">
        ₹ {product.price}/-
        </Typography>
        <Typography variant="body2" color="textSecondary" className="mb-2">
          {product.brand} - Rating: {product.rating}
        </Typography>
        <Button variant="contained" color="primary" component={Link} to={`/products/${product.id}`} className="mt-auto"> View Details</Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
