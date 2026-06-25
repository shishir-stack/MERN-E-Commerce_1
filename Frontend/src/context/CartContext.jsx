// context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { authDataContext } from './AuthContext';

export const cartDataContext = createContext();

function CartContext({ children }) {
  const [cartData, setCartData] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const { serverUrl } = useContext(authDataContext);

  const updateCartCount = (cart) => {
    let count = 0;
    const cartItems = cart || cartData;
    for (let itemId in cartItems) {
      for (let size in cartItems[itemId]) {
        count += cartItems[itemId][size];
      }
    }
    setCartCount(count);
  };

  
  const getCartData = async () => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/cart/get`,
        {},
        { withCredentials: true }  // ✅ Cookie-based
      );
      
      if (response.data.success) {
        const data = response.data.cartData || {};
        setCartData(data);
        updateCartCount(data);
      }
    } catch (error) {
      console.error("Get Cart Error:", error);
      setCartData({});
      setCartCount(0);
    }
  };

  
  const addToCart = async (itemId, size) => {
    try {
      if (!size) {
        alert('Please select a size');
        return false;
      }

      const response = await axios.post(
        `${serverUrl}/api/cart/add`,
        { itemId, size },
        { withCredentials: true }  // ✅ Cookie-based
      );

      if (response.data.success) {
        setCartData(response.data.cartData);
        updateCartCount(response.data.cartData);
        alert('Added to cart successfully!');
        return true;
      }
      return false;
    } catch (error) {
      console.error("Add to Cart Error:", error);
      alert(error.response?.data?.message || 'Failed to add to cart');
      return false;
    }
  };

  // কার্ট আপডেট করা (কোয়ান্টিটি পরিবর্তন)
  const updateCart = async (itemId, size, quantity) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/cart/update`,
        { itemId, size, quantity },
        { withCredentials: true }  // ✅ Cookie-based
      );

      if (response.data.success) {
        setCartData(response.data.cartData);
        updateCartCount(response.data.cartData);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Update Cart Error:", error);
      return false;
    }
  };

  // কার্ট থেকে আইটেম রিমুভ করা
  const removeFromCart = async (itemId, size) => {
    try {
      const result = await updateCart(itemId, size, 0);
      return result;
    } catch (error) {
      console.error("Remove from Cart Error:", error);
      return false;
    }
  };

  // পুরো কার্ট খালি করা
  const clearCart = async () => {
    try {
      setCartData({});
      setCartCount(0);
      return true;
    } catch (error) {
      console.error("Clear Cart Error:", error);
      return false;
    }
  };

  // পেজ লোড হলে কার্ট ডেটা লোড করুন
  useEffect(() => {
    getCartData();
  }, []);

  const value = {
    cartData,
    setCartData,
    cartCount,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart,
    getCartData,
    updateCartCount
  };

  return (
    <cartDataContext.Provider value={value}>
      {children}
    </cartDataContext.Provider>
  );
}

export default CartContext;