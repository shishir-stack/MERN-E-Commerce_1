import User from './../model/userModel.js';

export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    console.log("Cart Request Data:", { itemId, size, userId: req.userId });

    if (!itemId || !size) {
      return res.status(400).json({ success: false, message: "ItemId and size are required" });
    }

    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData ? JSON.parse(JSON.stringify(userData.cartData)) : {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    userData.cartData = cartData;
    userData.markModified('cartData'); 
    await userData.save();

    return res.status(201).json({ 
      success: true, 
      message: "Added to cart successfully", 
      cartData 
    });

  } catch (error) {
    console.error("addToCart error:", error);
    return res.status(500).json({ success: false, message: "addToCart error", error: error.message });
  }
};


export const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;

    if (!itemId || !size || quantity === undefined) {
      return res.status(400).json({ success: false, message: "ItemId, size and quantity are required" });
    }

    if (quantity < 0) {
      return res.status(400).json({ success: false, message: "Quantity cannot be negative" });
    }

    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData ? JSON.parse(JSON.stringify(userData.cartData)) : {};

    if (!cartData[itemId] || !cartData[itemId][size]) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    if (quantity === 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    userData.cartData = cartData;
    userData.markModified('cartData');
    await userData.save();

    return res.status(200).json({ 
      success: true, 
      message: "Cart updated successfully", 
      cartData 
    });

  } catch (error) {
    console.error("updateCart error:", error);
    return res.status(500).json({ success: false, message: "updateCart error", error: error.message });
  }
};


export const getUserCart = async (req, res) => {
  try {
    const userData = await User.findById(req.userId);
    
    if (!userData) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    let cartData = userData.cartData || {};

    return res.status(200).json({ 
      success: true, 
      cartData 
    });

  } catch (error) {
    console.error("getUserCart error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "getUserCart error", 
      error: error.message 
    });
  }
};