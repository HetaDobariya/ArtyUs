import pool from '../config/db.js';

export const findUserByEmail = async (email) => {
  const sql = 'SELECT * FROM user WHERE email = ?';
  const [rows] = await pool.query(sql, [email]);
  return rows[0];
};

export const createUser = async ({ name,email, address, password, contact }) => {
  const sql = `
    INSERT INTO user (name, email,address, password, contact, is_trader, is_admin, created_at, update_at, is_verified)
    VALUES (?, ?, ?, ?, ?, 0, 0, NOW(), NOW(), 0)
  `;
  const [result] = await pool.query(sql, [name, email,address, password, contact]);
  return result.insertId;
};

export const updateUserById = async (id, address, contact) => {
  const sql = 'UPDATE user SET address = ?, contact = ?, update_at = NOW() WHERE id = ?';
  const [result] = await pool.query(sql, [address, contact, id]);
  return result;
};

export const findTraderByUserId = async (userId) => {
  const sql = 'SELECT * FROM trader WHERE user_id = ?';
  const [rows] = await pool.query(sql, [userId]);
  return rows[0];
};
