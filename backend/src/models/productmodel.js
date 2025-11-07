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
