import pool from '../config/db.js';

export const addToCartModel = async (data) => {
  const { user_id, product_id, qty } = data;

  // Check if product exists and has sufficient stock
  const [productRows] = await pool.query(
    'SELECT qty, price, product_name FROM product WHERE id = ?',
    [product_id]
  );

  if (productRows.length === 0) {
    throw new Error('Product not found');
  }

  const product = productRows[0];
  if (product.qty < qty) {
    throw new Error('Insufficient stock');
  }

  // Check if item already exists in cart
  const [existingItems] = await pool.query(
    'SELECT id, qty FROM cart WHERE user_id = ? AND product_id = ?',
    [user_id, product_id]
  );

  if (existingItems.length > 0) {
    // Update existing cart item
    const newQty = existingItems[0].qty + qty;
    
    // Check stock again with new quantity
    if (product.qty < newQty) {
      throw new Error('Insufficient stock');
    }

    const [result] = await pool.query(
      'UPDATE cart SET qty = ? WHERE id = ?',
      [newQty, existingItems[0].id]
    );

    return result;
  } else {
    // Add new item to cart
    const sql = `
      INSERT INTO cart (user_id, product_id, qty)
      VALUES (?, ?, ?)
    `;

    const [result] = await pool.query(sql, [user_id, product_id, qty]);
    return result;
  }
};

export const getCartItemsModel = async (user_id) => {
  const sql = `
    SELECT 
      c.id,
      c.product_id,
      c.qty,
      p.product_name,
      p.price,
      p.image_url,
      p.description,
      p.qty as available_stock,
      (p.price * c.qty) as total_price,
      t.shop_name as trader_name,
      s.name as category
    FROM cart c
    JOIN product p ON c.product_id = p.id
    JOIN trader t ON p.trader_id = t.id
    JOIN slug s ON p.slug_id = s.id
    WHERE c.user_id = ?
    ORDER BY c.id DESC
  `;
  
  const [rows] = await pool.query(sql, [user_id]);
  return rows;
};

export const updateCartItemModel = async (cartItemId, qty) => {
  // Get product info to check stock
  const [cartItemRows] = await pool.query(`
    SELECT c.product_id, p.qty as available_stock 
    FROM cart c 
    JOIN product p ON c.product_id = p.id 
    WHERE c.id = ?
  `, [cartItemId]);

  if (cartItemRows.length === 0) {
    throw new Error('Cart item not found');
  }

  const availableStock = cartItemRows[0].available_stock;
  if (availableStock < qty) {
    throw new Error('Insufficient stock');
  }

  const [result] = await pool.query(
    'UPDATE cart SET qty = ? WHERE id = ?',
    [qty, cartItemId]
  );
  
  return result;
};

export const removeFromCartModel = async (cartItemId) => {
  const [result] = await pool.query('DELETE FROM cart WHERE id = ?', [cartItemId]);
  return result;
};

export const clearCartModel = async (user_id) => {
  const [result] = await pool.query('DELETE FROM cart WHERE user_id = ?', [user_id]);
  return result;
};

export const getCartItemByIdModel = async (cartItemId) => {
  const [rows] = await pool.query('SELECT * FROM cart WHERE id = ?', [cartItemId]);
  return rows[0];
};

// Get cart item by user and product (for internal use)
export const getCartItemByUserAndProduct = async (user_id, product_id) => {
  const [rows] = await pool.query(
    'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
    [user_id, product_id]
  );
  return rows[0];
};