import pool from '../config/db.js';

export const placeOrderModel = async (data) => {
  const { user_id, contact, address, cartItems } = data;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    let totalAmount = 0;
    const orderItems = [];
    const orderGroupId = Date.now(); // Use timestamp as order group identifier

    // Process each cart item
    for (const item of cartItems) {
      const itemTotal = item.price * item.qty;
      totalAmount += itemTotal;

      // Insert into orders table (note: column is 'staus' not 'status' in DB)
      // Store order group ID in address field as a temporary solution
      // Format: "actual_address|GROUP:timestamp"
      const addressWithGroup = `${address}|GROUP:${orderGroupId}`;
      const [orderResult] = await connection.query(
        `INSERT INTO orders (user_id, product_id, contact, price, qty, address) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, item.product_id, contact, item.price, item.qty, addressWithGroup]
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
      orderGroupId: orderGroupId, // Return group ID for grouping
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
      t.shop_name as trader_name,
      s.name as category
    FROM orders o
    JOIN product p ON o.product_id = p.id
    JOIN trader t ON p.trader_id = t.id
    JOIN slug s ON p.slug_id = s.id
    WHERE o.user_id = ?
    ORDER BY o.id DESC
  `;

  const [rows] = await pool.query(query, [user_id]);
  
  // Group orders by order group (extracted from address field) or by contact+address+time proximity
  const orderGroups = new Map();
  
  rows.forEach(row => {
    // Extract order group ID from address if present, otherwise use order ID
    let orderGroupId;
    const addressMatch = row.address?.match(/\|GROUP:(\d+)/);
    if (addressMatch) {
      orderGroupId = addressMatch[1];
      // Clean address for display
      row.address = row.address.replace(/\|GROUP:\d+/, '');
    } else {
      // For old orders without group ID, group by contact + address + id proximity (within 10 IDs)
      // This groups orders placed close together
      orderGroupId = `${row.contact}_${row.address}_${Math.floor(row.id / 10)}`;
    }
    
    if (!orderGroups.has(orderGroupId)) {
      orderGroups.set(orderGroupId, {
        order_group_id: orderGroupId,
        order_id: row.id, // Use first order ID as the main order ID
        contact: row.contact,
        address: row.address,
        items: []
      });
    }
    
    orderGroups.get(orderGroupId).items.push({
      order_id: row.id,
      product_name: row.product_name,
      category: row.category || 'Uncategorized',
      quantity: row.qty,
      price: parseFloat(row.price),
      total: parseFloat(row.total_amount),
    });
  });
  
  // Convert to array and calculate totals for each group
  return Array.from(orderGroups.values()).map(group => ({
    order_id: group.order_id,
    order_group_id: group.order_group_id,
    contact: group.contact,
    address: group.address,
    items: group.items,
    total: group.items.reduce((sum, item) => sum + item.total, 0),
    item_count: group.items.length
  }));
};

export const getOrderByIdModel = async (orderId, user_id) => {
  // First get the order to find its group ID
  const orderQuery = `
    SELECT id, address, contact
    FROM orders
    WHERE id = ? AND user_id = ?
  `;
  const [orderRows] = await pool.query(orderQuery, [orderId, user_id]);
  
  if (orderRows.length === 0) {
    return null;
  }
  
  const order = orderRows[0];
  let orderGroupId = null;
  let cleanAddress = order.address;
  
  // Extract group ID from address
  const addressMatch = order.address?.match(/\|GROUP:(\d+)/);
  if (addressMatch) {
    orderGroupId = addressMatch[1];
    cleanAddress = order.address.replace(/\|GROUP:\d+/, '');
  }
  
  // Get all items in this order group
  let query, params;
  if (orderGroupId) {
    query = `
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
        t.shop_name as trader_name,
        s.name as category,
        p.description
      FROM orders o
      JOIN product p ON o.product_id = p.id
      JOIN trader t ON p.trader_id = t.id
      JOIN slug s ON p.slug_id = s.id
      WHERE o.user_id = ? AND o.address LIKE ?
      ORDER BY o.id
    `;
    params = [user_id, `%|GROUP:${orderGroupId}`];
  } else {
    query = `
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
        t.shop_name as trader_name,
        s.name as category,
        p.description
      FROM orders o
      JOIN product p ON o.product_id = p.id
      JOIN trader t ON p.trader_id = t.id
      JOIN slug s ON p.slug_id = s.id
      WHERE o.id = ? AND o.user_id = ?
      ORDER BY o.id
    `;
    params = [orderId, user_id];
  }
  
  const [rows] = await pool.query(query, params);
  
  if (rows.length === 0) {
    return null;
  }
  
  // Return grouped order data
  return {
    order_id: orderId,
    order_group_id: orderGroupId,
    contact: order.contact,
    address: cleanAddress,
    items: rows.map(row => ({
      id: row.id,
      product_id: row.product_id,
      product_name: row.product_name,
      image_url: row.image_url,
      price: parseFloat(row.price),
      qty: row.qty,
      total_amount: parseFloat(row.total_amount),
      category: row.category,
      trader_name: row.trader_name,
      description: row.description
    })),
    total_amount: rows.reduce((sum, row) => sum + parseFloat(row.total_amount), 0)
  };
};

// Get order summary for a user
export const getOrderSummaryModel = async (user_id) => {
  const query = `
    SELECT 
      COUNT(DISTINCT id) as total_orders,
      COUNT(*) as total_items,
      SUM(price * qty) as total_spent
    FROM orders 
    WHERE user_id = ?
  `;

  const [rows] = await pool.query(query, [user_id]);
  return rows[0];
};