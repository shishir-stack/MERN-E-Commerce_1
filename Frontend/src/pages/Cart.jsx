

import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { shopDataContext } from '../context/ShopContext';
import { cartDataContext } from '../context/CartContext';
import { ShoppingCart, Trash2, Minus, Plus, ArrowLeft, CreditCard } from 'lucide-react';

function Cart() {
  const { products, currency } = useContext(shopDataContext);
  const { cartData, updateCart, removeFromCart, getCartData } = useContext(cartDataContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCartItems();
  }, [cartData, products]);

  const loadCartItems = () => {
    setLoading(true);
    const items = [];
    
    if (cartData && Object.keys(cartData).length > 0) {
      for (let itemId in cartData) {
        const product = products.find(p => p._id === itemId);
        if (product) {
          for (let size in cartData[itemId]) {
            items.push({
              ...product,
              size: size,
              quantity: cartData[itemId][size]
            });
          }
        }
      }
    }
    
    setCartItems(items);
    setLoading(false);
  };

  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const deliveryCharge = totalPrice > 0 ? 40 : 0;
  const grandTotal = totalPrice + deliveryCharge;

  const handleQuantityChange = async (itemId, size, newQuantity) => {
    if (newQuantity < 1) {
      await removeFromCart(itemId, size);
    } else {
      await updateCart(itemId, size, newQuantity);
    }
  };

  const handleRemoveItem = async (itemId, size) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      await removeFromCart(itemId, size);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/placeorder');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c2025] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c3f6fa] mx-auto"></div>
          <p className="mt-4 text-[#c3f6fa]">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0c2025] py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-[#1a1a1a] rounded-2xl border border-[#80808049] p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-[#0c2025] rounded-full flex items-center justify-center border border-[#80808049]">
                <ShoppingCart className="w-12 h-12 text-gray-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h2>
            <p className="text-gray-400 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link 
              to="/collections" 
              className="inline-flex items-center gap-2 bg-[#c3f6fa] text-[#0c2025] px-6 py-3 rounded-lg font-semibold hover:bg-[#a8e0e6] transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c2025] py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* হেডার - clearCart বাদ */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
            <span className="bg-[#1a1a1a] text-gray-400 px-3 py-1 rounded-full text-sm border border-[#80808049]">
              {cartItems.length} items
            </span>
          </div>
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div 
                key={`${item._id}-${item.size}-${index}`}
                className="bg-[#1a1a1a] rounded-xl border border-[#80808049] p-4 hover:border-[#c3f6fa]/30 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* ইমেজ */}
                  <div className="w-full sm:w-32 h-32 bg-[#0c2025] rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image1 || item.image || 'https://placehold.co/300x300/1a1a1a/c3f6fa?text=No+Image'} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/300x300/1a1a1a/c3f6fa?text=No+Image';
                      }}
                    />
                  </div>

                  
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg hover:text-[#c3f6fa] cursor-pointer transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-gray-400">Size: <span className="text-white font-medium">{item.size}</span></span>
                        <span className="text-sm text-gray-400">|</span>
                        <span className="text-[#c3f6fa] font-bold text-lg">
                          {currency}{item.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-yellow-400 text-sm">★★★★★</span>
                        <span className="text-gray-500 text-xs">(124)</span>
                      </div>
                    </div>

                  
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-[#0c2025] rounded-lg border border-[#80808049]">
                        <button
                          onClick={() => handleQuantityChange(item._id, item.size, item.quantity - 1)}
                          className="px-3 py-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 text-white font-medium min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item._id, item.size, item.quantity + 1)}
                          className="px-3 py-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item._id, item.size)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                
                <div className="mt-3 pt-3 border-t border-[#80808049] flex justify-end">
                  <span className="text-sm text-gray-400">
                    Item Total: <span className="text-[#c3f6fa] font-semibold">
                      {currency}{item.price * item.quantity}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          
          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a] rounded-xl border border-[#80808049] p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>{currency}{totalPrice}</span>
                </div>
                
                <div className="flex justify-between text-gray-300">
                  <span>Delivery Charge</span>
                  <span>{deliveryCharge === 0 ? 'Free' : `${currency}${deliveryCharge}`}</span>
                </div>
                
                <div className="border-t border-[#80808049] pt-4">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span className="text-[#c3f6fa]">{currency}{grandTotal}</span>
                  </div>
                </div>

                
                <div className="bg-[#0c2025] rounded-lg p-3 text-xs text-gray-400 border border-[#80808049]">
                  <p>✅ Free delivery on orders over {currency}1000</p>
                  <p>✅ 7 days easy return policy</p>
                  <p>✅ Cash on delivery available</p>
                </div>

                
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#c3f6fa] text-[#0c2025] py-3 rounded-lg font-semibold hover:bg-[#a8e0e6] transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Checkout
                </button>

                <Link 
                  to="/collections" 
                  className="w-full text-center text-gray-400 hover:text-white text-sm transition-colors flex items-center justify-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;