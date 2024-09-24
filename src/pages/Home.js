import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import ProductCard from './ProductCard';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="relative">
      <div className="w-12 h-12 rounded-full absolute
                      border-4 border-solid border-gray-200"></div>
      <div className="w-12 h-12 rounded-full animate-spin absolute
                      border-4 border-solid border-blue-500 border-t-transparent"></div>
    </div>
  </div>
);

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(response => {
        const fetchedProducts = response.data;
        setProducts(fetchedProducts);

        // Extract unique categories from products
        const uniqueCategories = [...new Set(fetchedProducts.map(product => product.category))];
        setCategories(uniqueCategories.map((category, index) => ({
          name: category,
          id: index + 1
        })));

        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  const getCategoryProducts = (categoryName) => {
    return products.filter(product => product.category === categoryName);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 mt-16">
        <LoadingSpinner />
        <p className="text-center text-gray-600 mt-4">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 mt-16">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-16">
      {categories.map(category => (
        <div key={category.id} className="mb-8">
          <h2 className="text-xl font-bold mb-4">{category.name}</h2>
          <div className="overflow-x-auto overflow-y-hidden">
            <div className="flex space-x-4">
              {getCategoryProducts(category.name).length > 0 ? (
                getCategoryProducts(category.name).map(product => (
                  <div key={product.id} className="flex-shrink-0">
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <p>No products available in this category.</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;