import pool from '../config/db.js';

export const getAllCategories = async () => {
  const [rows] = await pool.query("SELECT * FROM category ORDER BY id ASC");
  return rows;
};

export const getchildCategories = async () => {
  const [rows] = await pool.query("SELECT * FROM child_category ORDER BY id ASC");
  return rows;
};