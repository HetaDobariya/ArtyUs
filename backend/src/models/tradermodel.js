import pool from '../config/db.js';

export const findUserByEmail = async (email) => {
  const sql = 'SELECT * FROM user WHERE email = ?';
  const [rows] = await pool.query(sql, [email]);
  return rows[0];
};

export const createUser = async ({ name,email, address, password, contactNumber }) => {
  const sql = `
    INSERT INTO user (name, email,address, password, contact, is_trader, is_admin, created_at, update_at, is_verified)
    VALUES (?, ?, ?, ?, ?, 1, 0, NOW(), NOW(), 0)
  `;
  const [result] = await pool.query(sql, [name, email,address, password, contactNumber]);
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