import React, { createContext, useState, useContext, useCallback } from 'react';
import { fetchCartByUserId, removeItemFromCart } from '../api';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const cart = await fetchCartByUserId(user.id);
      setCartItems(cart.data.items);
    } catch (error) {
      toast.error('Error fetching cart: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const handleRemoveItem = async (cartItemId) => {
    if (!user) return;

    try {
      await removeItemFromCart(user.id, cartItemId);
      setCartItems(cartItems.filter(item => item.id !== cartItemId));
    } catch (error) {
      toast.error('Error removing item from cart: ' + error.message);
    }
  };


  const clearCart = () => {
    setCartItems([]); 
  };
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = 0; // Replace with actual discount logic
  const finalPrice = totalPrice - discount;

  const value = {
    cartItems,
    setCartItems,
    totalPrice,
    discount,
    finalPrice,
    handleRemoveItem,
    isLoading,
    fetchCart,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);