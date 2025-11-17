import { 
  placeOrderModel, 
  getUserOrdersModel, 
  getOrderByIdModel 
} from '../models/ordermodel.js';
import { getCartItemsModel, clearCartModel } from '../models/cartmodel.js';

export const placeOrder = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { contact, address } = req.body;

    if (!user_id) {
      return res.status(403).json({ error: 'Unauthorized: User not found in token' });
    }

    if (!contact || !address) {
      return res.status(400).json({ error: 'Contact and address are required' });
    }

    // Get user's cart items
    const cartItems = await getCartItemsModel(user_id);

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Validate stock availability
    for (const item of cartItems) {
      if (item.qty > item.available_stock) {
        return res.status(400).json({ 
          error: `Insufficient stock for ${item.product_name}. Available: ${item.available_stock}` 
        });
      }
    }

    // Place order
    const orderResult = await placeOrderModel({
      user_id,
      contact,
      address,
      cartItems
    });

    // Clear cart after successful order
    await clearCartModel(user_id);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order_id: orderResult.orderId,
      order_details: {
        total_items: cartItems.length,
        total_amount: orderResult.totalAmount,
        items: cartItems.map(item => ({
          product_name: item.product_name,
          quantity: item.qty,
          price: item.price,
          total: item.price * item.qty
        }))
      }
    });
  } catch (error) {
    console.error('Error placing order:', error);
    
    if (error.message === 'Cart is empty') {
      return res.status(400).json({ success: false, error: 'Cart is empty' });
    }
    if (error.message.includes('Insufficient stock')) {
      return res.status(400).json({ success: false, error: error.message });
    }
    
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(403).json({ error: 'Unauthorized: User not found in token' });
    }

    const orders = await getUserOrdersModel(user_id);

    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(403).json({ error: 'Unauthorized: User not found in token' });
    }

    const order = await getOrderByIdModel(id, user_id);

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        error: 'Order not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};