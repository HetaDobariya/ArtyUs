import pool from '../config/db.js';

export const placeOrderModel = async (data) => {
  const { user_id, contact, address, cartItems } = data;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    let totalAmount = 0;
    const orderItems = [];

    // Process each cart item
    for (const item of cartItems) {
      const itemTotal = item.price * item.qty;
      totalAmount += itemTotal;

      // Insert into orders table
      const [orderResult] = await connection.query(
        `INSERT INTO orders (user_id, product_id, contact, price, qty, address) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, item.product_id, contact, item.price, item.qty, address]
      );

      // Update product stock
      const newStock = item.available_stock - item.qty;
      await connection.query(
        'UPDATE product SET qty = ? WHERE id = ?',
        [newStock, item.product_id]
      );

      orderItems.push({
        order_id: orderResult.insertId,
        product_id: item.product_id,
        product_name: item.product_name,
        price: item.price,
        quantity: item.qty,
        total: itemTotal
      });
    }

    await connection.commit();

    return {
      orderId: orderItems[0].order_id, // Return first order ID as reference
      totalAmount,
      orderItems
    };

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const getUserOrdersModel = async (user_id) => {
  const query = `
    SELECT 
      o.id,
      o.product_id,
      p.product_name,
      p.image_url,
      o.price,
      o.qty,
      (o.price * o.qty) as total_amount,
      o.contact,
      o.address,
      o.created_at,
      t.shop_name as trader_name,
      s.name as category
    FROM orders o
    JOIN product p ON o.product_id = p.id
    JOIN trader t ON p.trader_id = t.id
    JOIN slug s ON p.slug_id = s.id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
  `;

  const [rows] = await pool.query(query, [user_id]);
  
  // Group by order date or order ID as needed
  const orders = {};
  rows.forEach(row => {
    const orderDate = new Date(row.created_at).toISOString().split('T')[0];
    if (!orders[orderDate]) {
      orders[orderDate] = [];
    }
    orders[orderDate].push(row);
  });

  return orders;
};

export const getOrderByIdModel = async (orderId, user_id) => {
  const query = `
    SELECT 
      o.id,
      o.product_id,
      p.product_name,
      p.image_url,
      o.price,
      o.qty,
      (o.price * o.qty) as total_amount,
      o.contact,
      o.address,
      o.created_at,
      t.shop_name as trader_name,
      s.name as category,
      p.description
    FROM orders o
    JOIN product p ON o.product_id = p.id
    JOIN trader t ON p.trader_id = t.id
    JOIN slug s ON p.slug_id = s.id
    WHERE o.id = ? AND o.user_id = ?
  `;

  const [rows] = await pool.query(query, [orderId, user_id]);
  return rows[0] || null;
};

// Get order summary for a user
export const getOrderSummaryModel = async (user_id) => {
  const query = `
    SELECT 
      COUNT(DISTINCT DATE(created_at)) as total_orders,
      COUNT(*) as total_items,
      SUM(price * qty) as total_spent
    FROM orders 
    WHERE user_id = ?
  `;

  const [rows] = await pool.query(query, [user_id]);
  return rows[0];
};