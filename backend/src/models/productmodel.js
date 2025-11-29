import pool from '../config/db.js';

export const addProductModel = async (data) => {
  const { slug_id, trader_id, product_name, qty, price, description, image_url } = data;

  const sql = `
    INSERT INTO product (product_name, qty, price, description, image_url, slug_id, trader_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await pool.query(sql, [
    product_name,
    qty,
    price,
    description,
    image_url,
    slug_id,
    trader_id,
  ]);

  return result;
};

export const getAllProductsModel = async () => {
  const sql = `
    SELECT 
      p.id,
      p.product_name,
      p.qty,
      p.price,
      p.description,
      p.image_url,
      s.name AS slug_name,
      c.name AS child_category_name,
      t.shop_name AS trader_name
    FROM product p
    JOIN slug s ON p.slug_id = s.id
    JOIN child_category c ON s.child_category_id = c.id
    JOIN trader t ON p.trader_id = t.id
    ORDER BY p.id DESC;
  `;
  const [rows] = await pool.query(sql);
  return rows;
};

export const updateProductById = async (id, { qty, price, description }) => {
  const [result] = await pool.query(
    `UPDATE product 
     SET qty = ?, price = ?, description = ?
     WHERE id = ?`,
    [qty, price, description, id]
  );
  return result;
};

// ✅ Delete product by ID
export const deleteProductById = async (id) => {
  const [result] = await pool.query(`DELETE FROM product WHERE id = ?`, [id]);
  return result;
};

export const getProductsByTraderIdModel = async (trader_id) => {
  const sql = `
    SELECT 
      p.id,
      p.product_name,
      p.qty,
      p.price,
      p.description,
      p.image_url,
      s.name AS slug_name,
      c.name AS child_category_name,
      t.shop_name AS trader_name
    FROM product p
    JOIN slug s ON p.slug_id = s.id
    JOIN child_category c ON s.child_category_id = c.id
    JOIN trader t ON p.trader_id = t.id
    WHERE p.trader_id = ?
    ORDER BY p.id DESC;
  `;
  const [rows] = await pool.query(sql, [trader_id]);
  return rows;
};

// Get products by slug name (category)
export const getProductsBySlug = async (slugName) => {
  const query = `
    SELECT 
      p.id,
      p.product_name,
      p.qty,
      p.price,
      p.description,
      p.image_url,
      s.name AS slug_name,
      c.name AS child_category_name,
      t.shop_name AS trader_name
    FROM product p
    JOIN slug s ON p.slug_id = s.id
    JOIN child_category c ON s.child_category_id = c.id
    JOIN trader t ON p.trader_id = t.id
    WHERE s.name = ? OR LOWER(REPLACE(s.name, ' ', '-')) = ?
    ORDER BY p.id DESC;
  `;
  const [rows] = await pool.query(query, [slugName, slugName.toLowerCase()]);
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
