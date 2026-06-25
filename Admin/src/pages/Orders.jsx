// pages/admin/Orders.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthDataContext } from './../context/AuthContext';
import { AdminDataContext } from './../context/AdminContext';
import { Package, 

  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Calendar,
  RefreshCw
} from 'lucide-react';

function Orders() {
  const { serverUrl } = useContext(AuthDataContext);
  const { adminData } = useContext(AdminDataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const statusOptions = [
    'Order Placed',
    'Packing',
    'Shipped',
    'Out for delivery',
    'Delivered',
    'Cancelled'
  ];

  const statusBadgeColors = {
    'Order Placed': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Packing': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Shipped': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'Out for delivery': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    'Delivered': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Cancelled': 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  useEffect(() => {
    if (adminData) {
      fetchOrders();
    }
  }, [adminData]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${serverUrl}/api/order/list`,
        {},
        { withCredentials: true }
      );
      
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error('Fetch orders error:', error);
    } finally {
      setLoading(false);
    }
  };

  
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/order/status`,
        { orderId, status: newStatus },
        { withCredentials: true }
      );
      
      if (response.data.success) {
        await fetchOrders();
       
        alert('Order status updated successfully!');
      }
    } catch (error) {
      console.error('Update status error:', error);
      
      
      if (error.response?.status === 403 || error.response?.status === 401) {
        alert('Session expired. Please refresh the page and login again.');
        window.location.reload(); 
      } else {
        alert('Failed to update order status. Please try again.');
      }
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getAmount = (amount) => {
    if (!amount) return 0;
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return isNaN(num) ? 0 : num;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address?.phone?.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c3f6fa] mx-auto"></div>
          <p className="mt-4 text-[#c3f6fa]">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-l from-[#141414] to-[#0c2025] text-white p-6 overflow-y-auto">
     
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <Package className="w-7 h-7 text-[#c3f6fa]" />
            All Orders List
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Total Orders: <span className="text-[#c3f6fa] font-semibold">{filteredOrders.length}</span>
          </p>
        </div>
        
        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-[#c3f6fa]/10 text-[#c3f6fa] rounded-lg hover:bg-[#c3f6fa]/20 transition-colors border border-[#c3f6fa]/30 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* সার্চ ও ফিল্টার */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by Order ID, Customer, Phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-[#80808049] rounded-lg text-white placeholder-gray-500 focus:border-[#c3f6fa] focus:outline-none transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-[#1a1a1a] border border-[#80808049] rounded-lg text-white focus:border-[#c3f6fa] focus:outline-none transition-colors"
          >
            <option value="all">All Status</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-[#1a1a1a] rounded-xl border border-[#80808049] p-12 text-center">
            <Package className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No orders found</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const isExpanded = expandedOrder === order._id;
            const orderAmount = getAmount(order.amount);
            const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items || [];
            const totalItems = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
            
            return (
              <div
                key={order._id}
                className="bg-[#1a1a1a] rounded-xl border border-[#80808049] overflow-hidden hover:border-[#c3f6fa]/30 transition-all duration-300"
              >
                
                <div 
                  className="p-4 cursor-pointer hover:bg-[#0c2025]/50 transition-colors"
                  onClick={() => toggleExpand(order._id)}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#0c2025] rounded-lg flex items-center justify-center border border-[#80808049]">
                        <Package className="w-5 h-5 text-[#c3f6fa]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Order ID</p>
                        <p className="text-sm font-mono text-white">#{order._id?.slice(-8)}</p>
                      </div>
                      <div className="hidden sm:block">
                        <p className="text-sm text-gray-400">Customer</p>
                        <p className="text-sm text-white">
                          {order.address?.firstName} {order.address?.lastName}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-sm text-gray-400">Items</p>
                          <p className="text-sm text-white">{totalItems}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Payment</p>
                          <p className="text-sm text-white">{order.paymentMethod || 'COD'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Total</p>
                          <p className="text-sm font-bold text-[#c3f6fa]">₹{orderAmount.toFixed(0)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-3 py-1 rounded-full border ${statusBadgeColors[order.status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                        {order.status || 'Order Placed'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                
                {isExpanded && (
                  <div className="border-t border-[#80808049] p-4 bg-[#0c2025]/30">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-1">
                        <h4 className="text-sm font-semibold text-gray-400 mb-3">Items</h4>
                        <div className="space-y-2">
                          {items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm border-b border-[#80808049]/30 pb-2 last:border-0">
                              <span className="text-white">
                                {item.name} 
                                <span className="text-gray-400 text-xs ml-1">× {item.quantity}</span>
                              </span>
                              <span className="text-gray-300">₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-2 border-t border-[#80808049] flex justify-between font-semibold">
                          <span className="text-white">Total</span>
                          <span className="text-[#c3f6fa]">₹{orderAmount.toFixed(0)}</span>
                        </div>
                      </div>

                      <div className="lg:col-span-1">
                        <h4 className="text-sm font-semibold text-gray-400 mb-3">Delivery Information</h4>
                        <div className="space-y-1 text-sm">
                          <p className="text-white">
                            {order.address?.firstName} {order.address?.lastName}
                          </p>
                          <p className="text-gray-400">{order.address?.street}</p>
                          <p className="text-gray-400">
                            {order.address?.city}, {order.address?.state}
                          </p>
                          <p className="text-gray-400">{order.address?.country}, {order.address?.pincode}</p>
                          <p className="text-[#c3f6fa]">{order.address?.phone}</p>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-4 text-sm">
                          <span className="text-gray-400">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {formatDate(order.date)}
                          </span>
                          <span className="text-gray-400">
                            Payment: <span className="text-white">{order.paymentMethod || 'COD'}</span>
                          </span>
                        </div>
                      </div>

                      <div className="lg:col-span-1">
                        <h4 className="text-sm font-semibold text-gray-400 mb-3">Update Status</h4>
                        <div className="flex flex-wrap gap-2">
                          {statusOptions.map((status) => (
                            <button
                              key={status}
                              onClick={() => updateOrderStatus(order._id, status)}
                              className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                                order.status === status
                                  ? statusBadgeColors[status]
                                  : 'bg-[#1a1a1a] text-gray-400 border-[#80808049] hover:border-[#c3f6fa]/50 hover:text-white'
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Orders;