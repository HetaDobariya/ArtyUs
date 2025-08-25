import pool from '../config/db.js';

export const findUserByEmail = async (email) => {
  const sql = 'SELECT * FROM user WHERE email = ?';
  const [rows] = await pool.query(sql, [email]);
  return rows[0];
};

export const createUser = async ({ email, password, name, contact }) => {
  const sql = `
    INSERT INTO user (email, password, name, contact, is_trader, is_admin, created_at, update_at, is_verified)
    VALUES (?, ?, ?, ?, 0, 0, NOW(), NOW(), 0)
  `;
  const [result] = await pool.query(sql, [email, password, name, contact]);
  return result.insertId;
};
