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
