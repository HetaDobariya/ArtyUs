import { 
  addToCartModel, 
  getCartItemsModel, 
  updateCartItemModel, 
  removeFromCartModel, 
  clearCartModel,
  getCartItemByIdModel 
} from '../models/cartmodel.js';

export const addToCart = async (req, res) => {
  try {
    const { product_id, qty } = req.body;
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(403).json({ error: 'Unauthorized: User not found in token' });
    }

    if (!product_id || !qty) {
      return res.status(400).json({ error: 'Product ID and quantity are required' });
    }

    if (qty <= 0) {
      return res.status(400).json({ error: 'Quantity must be greater than 0' });
    }

    const result = await addToCartModel({
      user_id,
      product_id,
      qty
    });

    res.status(201).json({
      success: true,
      message: 'Product added to cart successfully',
      cart_item_id: result.insertId,
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    
    if (error.message === 'Product not found') {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    if (error.message === 'Insufficient stock') {
      return res.status(400).json({ success: false, error: 'Insufficient stock available' });
    }
    
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(403).json({ error: 'Unauthorized: User not found in token' });
    }

    const cartItems = await getCartItemsModel(user_id);

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

    res.status(200).json({
      success: true,
      data: {
        items: cartItems,
        summary: {
          subtotal,
          totalItems,
          shipping: 0, // You can add shipping calculation logic here
          total: subtotal // You can add tax/discount logic here
        }
      }
    });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { qty } = req.body;
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(403).json({ error: 'Unauthorized: User not found in token' });
    }

    if (!qty || qty <= 0) {
      return res.status(400).json({ error: 'Valid quantity is required' });
    }

    // Verify the cart item belongs to the user
    const cartItem = await getCartItemByIdModel(id);
    if (!cartItem || cartItem.user_id !== user_id) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    const result = await updateCartItemModel(id, qty);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cart item not found or no changes made" });
    }

    res.status(200).json({ 
      success: true,
      message: "Cart item updated successfully" 
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    
    if (error.message === 'Insufficient stock') {
      return res.status(400).json({ success: false, error: 'Insufficient stock available' });
    }
    
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(403).json({ error: 'Unauthorized: User not found in token' });
    }

    // Verify the cart item belongs to the user
    const cartItem = await getCartItemByIdModel(id);
    if (!cartItem || cartItem.user_id !== user_id) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    const result = await removeFromCartModel(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.status(200).json({ 
      success: true,
      message: "Item removed from cart successfully" 
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const clearCart = async (req, res) => {
  try {
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(403).json({ error: 'Unauthorized: User not found in token' });
    }

    const result = await clearCartModel(user_id);

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      removedItems: result.affectedRows
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};