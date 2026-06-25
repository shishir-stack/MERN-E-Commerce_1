// pages/PlaceOrder.jsx
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { shopDataContext } from '../context/ShopContext';
import { cartDataContext } from '../context/CartContext';
import { authDataContext } from '../context/AuthContext';
import { ArrowLeft, Truck, CreditCard, DollarSign, Phone, Mail, Home } from 'lucide-react';

function PlaceOrder() {
  const { products, currency } = useContext(shopDataContext);
  const { cartData, clearCart } = useContext(cartDataContext);
  const { serverUrl } = useContext(authDataContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    phone: ''
  });

  useEffect(() => {
    loadCartItems();
  }, [cartData, products]);

  const loadCartItems = () => {
    const items = [];
    if (cartData && Object.keys(cartData).length > 0) {
      for (let itemId in cartData) {
        const product = products.find(p => p._id === itemId);
        if (product) {
          for (let size in cartData[itemId]) {
            items.push({
              productId: product._id,
              name: product.name,
              price: Number(product.price),
              size: size,
              quantity: Number(cartData[itemId][size]),
              image: product.image1 || product.image
            });
          }
        }
      }
    }
    setCartItems(items);
  };

  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const shippingFee = subtotal > 0 ? 40 : 0;
  const total = subtotal + shippingFee;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const requiredFields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'pincode', 'phone'];
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in ${field}`);
        return;
      }
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setLoading(true);

    try {
      
      const itemsString = JSON.stringify(cartItems.map(item => ({
        productId: item.productId,
        name: item.name,
        price: Number(item.price),
        size: item.size,
        quantity: Number(item.quantity)
      })));

      const orderData = {
        items: itemsString,  
        amount: Number(total),
        address: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: formData.country,
          phone: formData.phone
        }
      };

      console.log(' Order Data:', orderData);

      const response = await axios.post(
        `${serverUrl}/api/order/placeorder`,
        orderData,
        { withCredentials: true }
      );

      console.log('✅ Order Response:', response.data);

      if (response.data.success) {
        await clearCart();
        alert(' Order placed successfully!');
        navigate('/myorders', { 
          state: { 
            orderSuccess: true,
            orderId: response.data.orderId 
          } 
        });
      } else {
        alert(response.data.message || 'Failed to place order');
      }

    } catch (error) {
      console.error('Order Error:', error);
      if (error.response) {
        console.error('Error Response:', error.response.data);
        alert(error.response.data?.message || 'Failed to place order');
      } else {
        alert('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0c2025] py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-[#1a1a1a] rounded-2xl border border-[#80808049] p-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h2>
            <p className="text-gray-400 mb-8">Add some items to your cart before placing an order.</p>
            <Link 
              to="/collections" 
              className="inline-flex items-center gap-2 bg-[#c3f6fa] text-[#0c2025] px-6 py-3 rounded-lg font-semibold hover:bg-[#a8e0e6] transition-colors"
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
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/cart')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold text-white">Place Order</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#1a1a1a] rounded-xl border border-[#80808049] p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#0c2025] rounded-lg flex items-center justify-center border border-[#80808049]">
                  <Truck className="w-5 h-5 text-[#c3f6fa]" />
                </div>
                <h2 className="text-xl font-bold text-white">Delivery Information</h2>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-[#0c2025] border border-[#80808049] rounded-lg text-white placeholder-gray-500 focus:border-[#c3f6fa] focus:outline-none transition-colors"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-[#0c2025] border border-[#80808049] rounded-lg text-white placeholder-gray-500 focus:border-[#c3f6fa] focus:outline-none transition-colors"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 bg-[#0c2025] border border-[#80808049] rounded-lg text-white placeholder-gray-500 focus:border-[#c3f6fa] focus:outline-none transition-colors"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Street Address *</label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 bg-[#0c2025] border border-[#80808049] rounded-lg text-white placeholder-gray-500 focus:border-[#c3f6fa] focus:outline-none transition-colors"
                      placeholder="123 Main Street"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-[#0c2025] border border-[#80808049] rounded-lg text-white placeholder-gray-500 focus:border-[#c3f6fa] focus:outline-none transition-colors"
                      placeholder="Mumbai"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-[#0c2025] border border-[#80808049] rounded-lg text-white placeholder-gray-500 focus:border-[#c3f6fa] focus:outline-none transition-colors"
                      placeholder="Maharashtra"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-[#0c2025] border border-[#80808049] rounded-lg text-white placeholder-gray-500 focus:border-[#c3f6fa] focus:outline-none transition-colors"
                      placeholder="400001"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Country *</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-[#0c2025] border border-[#80808049] rounded-lg text-white placeholder-gray-500 focus:border-[#c3f6fa] focus:outline-none transition-colors"
                      placeholder="India"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 bg-[#0c2025] border border-[#80808049] rounded-lg text-white placeholder-gray-500 focus:border-[#c3f6fa] focus:outline-none transition-colors"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-[#1a1a1a] rounded-xl border border-[#80808049] p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#0c2025] rounded-lg flex items-center justify-center border border-[#80808049]">
                  <CreditCard className="w-5 h-5 text-[#c3f6fa]" />
                </div>
                <h2 className="text-xl font-bold text-white">Payment Method</h2>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 bg-[#0c2025] rounded-lg border border-[#80808049] cursor-pointer hover:border-[#c3f6fa]/50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="razorpay"
                    checked={paymentMethod === 'razorpay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-[#c3f6fa]"
                  />
                  <span className="text-white font-medium">Razorpay</span>
                  <span className="ml-auto text-xs text-gray-500">Online Payment</span>
                </label>

                <label className="flex items-center gap-3 p-4 bg-[#0c2025] rounded-lg border border-[#80808049] cursor-pointer hover:border-[#c3f6fa]/50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-[#c3f6fa]"
                  />
                  <span className="text-white font-medium">Cash on Delivery</span>
                  <span className="ml-auto text-xs text-gray-500">Pay at delivery</span>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a] rounded-xl border border-[#80808049] p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Cart Totals</h2>

              <div className="space-y-3 max-h-48 overflow-y-auto mb-4 pr-2">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-300">
                      {item.name} × {item.quantity}
                      <span className="text-gray-500 text-xs ml-1">({item.size})</span>
                    </span>
                    <span className="text-[#c3f6fa]">{currency}{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#80808049] pt-4 space-y-3">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>{currency}{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping Fee</span>
                  <span>{shippingFee === 0 ? 'Free' : `${currency}${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-[#80808049] pt-3">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span className="text-[#c3f6fa]">{currency}{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-[#0c2025] rounded-lg p-3 text-xs text-gray-400 border border-[#80808049]">
                <p>✅ Free delivery on orders over {currency}1000</p>
                <p>✅ 7 days easy return policy</p>
                <p>✅ Cash on delivery available</p>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className={`w-full mt-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  loading 
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-[#c3f6fa] text-[#0c2025] hover:bg-[#a8e0e6] hover:scale-[1.02]'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0c2025]"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <DollarSign className="w-5 h-5" />
                    Place Order
                  </>
                )}
              </button>

              <Link 
                to="/cart" 
                className="w-full text-center text-gray-400 hover:text-white text-sm transition-colors flex items-center justify-center gap-1 mt-3"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;