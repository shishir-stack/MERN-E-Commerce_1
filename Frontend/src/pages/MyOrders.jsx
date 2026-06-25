// pages/MyOrders.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { shopDataContext } from '../context/ShopContext';
import { Package, Truck, Calendar, CreditCard, Eye } from 'lucide-react';

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { serverUrl } = useContext(authDataContext);
    const { currency } = useContext(shopDataContext);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(
                `${serverUrl}/api/order/userorders`,
                {},
                { withCredentials: true }
            );
            
            console.log('Orders Response:', response.data);
            
            if (response.data.success) {
                setOrders(response.data.orders);
            } else {
                setOrders([]);
            }
        } catch (error) {
            console.error('Fetch orders error:', error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };


    const formatDate = (date) => {
        if (!date) return 'N/A';
        const d = new Date(date);
        return d.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    
    const getAmount = (amount) => {
        if (!amount) return 0;
        const num = typeof amount === 'string' ? parseFloat(amount) : amount;
        return isNaN(num) ? 0 : num;
    };

    
    const getStatusColor = (status) => {
        switch(status?.toLowerCase()) {
            case 'order placed':
                return 'text-blue-400';
            case 'processing':
                return 'text-yellow-400';
            case 'shipped':
                return 'text-purple-400';
            case 'delivered':
                return 'text-green-400';
            case 'cancelled':
                return 'text-red-400';
            default:
                return 'text-gray-400';
        }
    };

    
    const getStatusBadgeColor = (status) => {
        switch(status?.toLowerCase()) {
            case 'order placed':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'processing':
                return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'shipped':
                return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            case 'delivered':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'cancelled':
                return 'bg-red-500/20 text-red-400 border-red-500/30';
            default:
                return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0c2025] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c3f6fa] mx-auto"></div>
                    <p className="mt-4 text-[#c3f6fa]">Loading your orders...</p>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-[#0c2025] py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-[#1a1a1a] rounded-2xl border border-[#80808049] p-12 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-24 h-24 bg-[#0c2025] rounded-full flex items-center justify-center border border-[#80808049]">
                                <Package className="w-12 h-12 text-gray-500" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">No Orders Yet</h2>
                        <p className="text-gray-400 mb-8">
                            You haven't placed any orders yet. Start shopping now!
                        </p>
                        <Link 
                            to="/collections" 
                            className="inline-flex items-center gap-2 bg-[#c3f6fa] text-[#0c2025] px-6 py-3 rounded-lg font-semibold hover:bg-[#a8e0e6] transition-colors"
                        >
                            Start Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0c2025] py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* হেডার */}
                <div className="flex items-center gap-3 mb-8">
                    <Package className="w-8 h-8 text-[#c3f6fa]" />
                    <h1 className="text-3xl font-bold text-white">My Orders</h1>
                    <span className="bg-[#1a1a1a] text-gray-400 px-3 py-1 rounded-full text-sm border border-[#80808049] ml-2">
                        {orders.length} {orders.length === 1 ? 'order' : 'orders'}
                    </span>
                </div>

                
                <div className="space-y-6">
                    {orders.map((order) => {
                        
                        const orderAmount = getAmount(order.amount);
                        
                        return (
                        <div 
                            key={order._id}
                            className="bg-[#1a1a1a] rounded-xl border border-[#80808049] overflow-hidden hover:border-[#c3f6fa]/30 transition-all duration-300"
                        >
                            {/* অর্ডার হেডার */}
                            <div className="bg-[#0c2025] px-6 py-4 border-b border-[#80808049] flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500">Order ID</p>
                                        <p className="text-sm text-white font-mono">
                                            #{order._id?.slice(-8) || 'N/A'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Date</p>
                                        <p className="text-sm text-white flex items-center gap-1">
                                            <Calendar className="w-3 h-3 text-gray-400" />
                                            {formatDate(order.date)}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500">Total</p>
                                        <p className="text-sm font-bold text-[#c3f6fa]">
                                            {currency}{orderAmount.toFixed(2)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Payment</p>
                                        <p className="text-sm text-white flex items-center gap-1">
                                            <CreditCard className="w-3 h-3 text-gray-400" />
                                            {order.paymentMethod || 'COD'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Status</p>
                                        <span className={`text-xs px-3 py-1 rounded-full border ${getStatusBadgeColor(order.status)}`}>
                                            {order.status || 'Order Placed'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* অর্ডার আইটেম */}
                            <div className="p-6 space-y-4">
                                {order.items && typeof order.items === 'string' ? (
                                    JSON.parse(order.items).map((item, index) => (
                                        <div key={index} className="flex items-center justify-between border-b border-[#80808049] pb-3 last:border-0 last:pb-0">
                                            <div>
                                                <h4 className="text-white font-medium">{item.name}</h4>
                                                <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                                                    <span>Size: <span className="text-white">{item.size}</span></span>
                                                    <span>|</span>
                                                    <span>Qty: <span className="text-white">{item.quantity}</span></span>
                                                    <span>|</span>
                                                    <span className="text-[#c3f6fa]">{currency}{item.price}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-400">Total</p>
                                                <p className="text-sm font-semibold text-[#c3f6fa]">
                                                    {currency}{item.price * item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    order.items?.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between border-b border-[#80808049] pb-3 last:border-0 last:pb-0">
                                            <div>
                                                <h4 className="text-white font-medium">{item.name}</h4>
                                                <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                                                    <span>Size: <span className="text-white">{item.size}</span></span>
                                                    <span>|</span>
                                                    <span>Qty: <span className="text-white">{item.quantity}</span></span>
                                                    <span>|</span>
                                                    <span className="text-[#c3f6fa]">{currency}{item.price}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-400">Total</p>
                                                <p className="text-sm font-semibold text-[#c3f6fa]">
                                                    {currency}{item.price * item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* অর্ডার ফুটার */}
                            <div className="bg-[#0c2025] px-6 py-4 border-t border-[#80808049] flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(order.status)}`}></span>
                                        <span className={`text-sm font-medium ${getStatusColor(order.status)}`}>
                                            {order.status || 'Order Placed'}
                                        </span>
                                    </div>
                                    <span className="text-gray-600 text-sm">•</span>
                                    <span className="text-sm text-gray-400">
                                        {order.paymentMethod === 'COD' ? 'Cash on Delivery' : order.paymentMethod}
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#c3f6fa] transition-colors">
                                        <Truck className="w-4 h-4" />
                                        Track Order
                                    </button>
                                    <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#c3f6fa] transition-colors">
                                        <Eye className="w-4 h-4" />
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        </div>
    );
}

export default MyOrders;