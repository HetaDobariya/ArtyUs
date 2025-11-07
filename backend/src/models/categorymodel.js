import pool from '../config/db.js';

export const getAllCategories = async () => {
  const [rows] = await pool.query("SELECT * FROM category ORDER BY id ASC");
  return rows;
};

export const getchildCategories = async () => {
  const [rows] = await pool.query("SELECT * FROM child_category ORDER BY id ASC");
  return rows;
};

export const getslugs = async () => {
  const [rows] = await pool.query(`
    SELECT 
      s.id,
      s.name AS slug_name,
      c.name AS child_category_name
    FROM slug s
    JOIN child_category c
      ON s.child_category_id = c.id
    ORDER BY s.id ASC
  `);
  return rows;
};
