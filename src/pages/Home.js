import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import ProductCard from './ProductCard';

const categories = [
  { name: 'Most Trending', id: 1 },
  { name: 'New Arrivals', id: 2 },
  { name: 'Best Sellers', id: 3 },
  { name: 'On Sale', id: 4 },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(response => {
        console.log('Products fetched:', response.data);
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  // Repeat products if no categories
  const categorizedProducts = categories.map(category => ({
    ...category,
    products: products.length ? products : products,
  }));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 mt-16">
      {categorizedProducts.map(category => (
        <div key={category.id} className="mb-8">
          <h2 className="text-xl font-bold mb-4">{category.name}</h2>
          <div className="overflow-x-auto">
            <div className="flex space-x-4">
              {category.products.length > 0 ? (
                category.products.map(product => (
                  <div key={product.id} className="flex-shrink-0">
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <p>No products available.</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
