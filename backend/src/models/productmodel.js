import pool from '../config/db.js';

// Get all products
export const getAllProducts = async () => {
  const query = `
    SELECT 
      p.id,
      p.product_name as name,
      p.price,
      p.qty as quantity,
      p.description,
      p.image_url as image,
      s.name as category,
      t.shop_name as company,
      p.description as details
    FROM product p
    JOIN slug s ON p.slug_id = s.id
    JOIN trader t ON p.trader_id = t.id
    ORDER BY p.id
  `;
  const [rows] = await pool.query(query);
  return rows;
};

// Get products by slug name (category)
export const getProductsBySlug = async (slugName) => {
  const query = `
    SELECT 
      p.id,
      p.product_name as name,
      p.price,
      p.qty as quantity,
      p.description,
      p.image_url as image,
      s.name as category,
      t.shop_name as company,
      p.description as details
    FROM product p
    JOIN slug s ON p.slug_id = s.id
    JOIN trader t ON p.trader_id = t.id
    WHERE LOWER(REPLACE(s.name, ' ', '-')) = LOWER(?)
    ORDER BY p.id
  `;
  const [rows] = await pool.query(query, [slugName]);
  return rows;
};

// Get product by ID
export const getProductById = async (id) => {
  const query = `
    SELECT 
      p.id,
      p.product_name as name,
      p.price,
      p.qty as quantity,
      p.description,
      p.image_url as image,
      s.name as category,
      t.shop_name as company,
      p.description as details
    FROM product p
    JOIN slug s ON p.slug_id = s.id
    JOIN trader t ON p.trader_id = t.id
    WHERE p.id = ?
  `;
  const [rows] = await pool.query(query, [id]);
  return rows[0];
};

// Get all available slugs/categories
export const getAllSlugs = async () => {
  const query = `
    SELECT 
      id,
      name,
      LOWER(REPLACE(name, ' ', '-')) as slug
    FROM slug
    ORDER BY name
  `;
  const [rows] = await pool.query(query);
  return rows;
};

