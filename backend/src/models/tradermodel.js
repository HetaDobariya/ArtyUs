import pool from '../config/db.js';

export const findUserByEmail = async (email) => {
  const sql = 'SELECT * FROM user WHERE email = ?';
  const [rows] = await pool.query(sql, [email]);
  return rows[0];
};

export const createUser = async ({ name, email, address, password, contactNumber }) => {
  const sql = `
    INSERT INTO user (name, email, address, password, contact, is_trader, is_serviceprovider, is_admin, created_at, update_at, is_verified)
    VALUES (?, ?, ?, ?, ?, 1, 0, 0, NOW(), NOW(), 0)
  `;
  const [result] = await pool.query(sql, [name, email, address, password, contactNumber]);
  return result.insertId;
};

export const createTrader = async ({userId, shopName, shopContactNumber, shopAddress, description  }) => {
  const sql = `
    INSERT INTO trader (user_id,shop_name,contact,address,description,created_at,updated_at)
    VALUES (?, ?, ?, ?, ?, NOW(), NOW())
  `;
  const [result] = await pool.query(sql, [userId, shopName,shopContactNumber, shopAddress,description]);
  return result.insertId;
};

export const updateTraderById = async (id, address, contact, description) => {
  const sql = 'UPDATE trader SET address = ?, contact = ?, description = ?, updated_at = NOW() WHERE user_id = ?';
  const [result] = await pool.query(sql, [address, contact, description, id]);
  return result;
};

export const verifyTraderById = async (id) => {
  const [result] = await pool.query(
    `UPDATE user 
     SET is_verified = 1 
     WHERE id = ? AND is_trader = 1`,
    [id]
  );
  return result;
};

export const getUnverifiedTraderList = async () => {
  const [rows] = await pool.query(`
    SELECT 
      u.id AS user_id,
      u.name AS user_name,
      u.email,
      u.contact,
      u.address,
      t.id AS trader_id,
      t.shop_name,
      t.description,
      t.created_at
    FROM user u
    JOIN trader t ON u.id = t.user_id
    WHERE u.is_trader = 1 AND u.is_verified = 0
    ORDER BY t.created_at DESC;
  `);
  return rows;
};


export const getTraderOrdersModel = async (trader_id) => {
  const query = `
    SELECT 
      o.id as order_id,
      o.product_id,
      p.product_name,
      p.image_url,
      o.price,
      o.qty,
      (o.price * o.qty) as total_amount,
      o.contact,
      o.address,
      o.created_at,
      u.name as customer_name,
      u.email as customer_email,
      s.name as category
    FROM orders o
    JOIN product p ON o.product_id = p.id
    JOIN user u ON o.user_id = u.id
    JOIN slug s ON p.slug_id = s.id
    WHERE p.trader_id = ?
    ORDER BY o.created_at DESC
  `;

  const [rows] = await pool.query(query, [trader_id]);
  
  // Group orders by order group (extracted from address field)
  const orderGroups = new Map();
  
  rows.forEach(row => {
    // Extract order group ID from address if present
    let orderGroupId;
    let cleanAddress = row.address;
    
    const addressMatch = row.address?.match(/\|GROUP:(\d+)/);
    if (addressMatch) {
      orderGroupId = addressMatch[1];
      cleanAddress = row.address.replace(/\|GROUP:\d+/, '');
    } else {
      // For orders without group ID, use a combination of contact, address, and date
      const orderDate = new Date(row.created_at).toISOString().split('T')[0];
      orderGroupId = `${row.contact}_${cleanAddress}_${orderDate}`;
    }
    
    if (!orderGroups.has(orderGroupId)) {
      orderGroups.set(orderGroupId, {
        order_group_id: orderGroupId,
        main_order_id: row.order_id,
        contact: row.contact,
        address: cleanAddress,
        customer_name: row.customer_name,
        customer_email: row.customer_email,
        created_at: row.created_at,
        items: []
      });
    }
    
    orderGroups.get(orderGroupId).items.push({
      order_id: row.order_id,
      product_id: row.product_id,
      product_name: row.product_name,
      image_url: row.image_url,
      category: row.category,
      quantity: row.qty,
      price: parseFloat(row.price),
      total: parseFloat(row.total_amount),
    });
  });
  
  // Convert to array and calculate totals for each group
  return Array.from(orderGroups.values()).map(group => ({
    order_id: group.main_order_id,
    order_group_id: group.order_group_id,
    customer_name: group.customer_name,
    customer_email: group.customer_email,
    contact: group.contact,
    address: group.address,
    created_at: group.created_at,
    items: group.items,
    total_amount: group.items.reduce((sum, item) => sum + item.total, 0),
    item_count: group.items.length
  }));
};