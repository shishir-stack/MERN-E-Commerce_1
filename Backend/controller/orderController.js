import Order from "../model/orderModel.js";
import User from './../model/userModel.js';



export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    if (!items || !items.length || !amount || !address) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod: 'COD',
      payment: false,
      date: Date.now()
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(201).json({ 
      success: true,
      message: 'Order placed successfully',
      orderId: newOrder._id 
    });

  } catch (error) {
    console.error('Order placement error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Order placement failed' 
    });
  }
};


export const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        
    
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        
        
        if (!orders || orders.length === 0) {
            return res.status(200).json({ 
                success: true,
                message: 'No orders found',
                orders: [] 
            });
        }
        
        return res.status(200).json({ 
            success: true,
            orders: orders 
        });
        
    } catch (error) {
        console.error('userOrders error:', error);
        return res.status(500).json({ 
            success: false,
            message: "userOrders error",
            error: error.message 
        });
    }
};


// controller/orderController.js

// 1. সব অর্ডার লিস্ট (অ্যাডমিন)
export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            orders: orders
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "adminAllOrdersError",
            error: error.message
        });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        if (!orderId || !status) {
            return res.status(400).json({
                success: false,
                message: "OrderId and status are required"
            });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        return res.status(201).json({
            success: true,
            message: 'Status Updated',
            order: updatedOrder
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};