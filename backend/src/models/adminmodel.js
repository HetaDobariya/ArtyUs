import pool from "../config/db.js";

export const userDetais = async() => {
    
  const sql = `
    select id,name,email,address,is_trader,is_verified from user;
  `;
  const [rows] = await pool.query(sql);
  return rows;
}

export const updateUserById = async (id, data) => {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(data)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  const sql = `UPDATE user SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  const [result] = await pool.query(sql, values);
  return result;
};

export const deleteUserById = async (id) => {
  const sql = `DELETE FROM user WHERE id = ?`;
  await pool.query(sql, [id]);
};



export const traderDetails = async () => {
  const sql = `
    SELECT 
      u.id AS user_id,
      u.name AS user_name,
      u.email,
      u.address AS user_address,
      u.contact AS user_contact,
      u.is_verified,
      t.id AS trader_id,
      t.shop_name,
      t.address AS shop_address,
      t.contact AS shop_contact,
      t.description
    FROM trader t
    INNER JOIN user u ON t.user_id = u.id
    WHERE u.is_verified = 1;
  `;

  const [rows] = await pool.query(sql);
  return rows;
};

export const updateTraderById = async (id, data) => {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(data)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  const sql = `UPDATE trader SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  const [result] = await pool.query(sql, values);
  return result;
};

export const deleteTraderById = async (traderId) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1️⃣ Get user_id from trader
    const [rows] = await connection.query(`SELECT user_id FROM trader WHERE id = ?`, [traderId]);
    if (rows.length === 0) {
      throw new Error("Trader not found");
    }
    const userId = rows[0].user_id;

    // 2️⃣ Delete from trader table
    await connection.query(`DELETE FROM trader WHERE id = ?`, [traderId]);

    // 3️⃣ Delete user record as well
    await connection.query(`DELETE FROM user WHERE id = ?`, [userId]);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const addslugsbyname = async (category_name, slug_name) => {
  try {
    const [categoryRows] = await pool.query(
      `SELECT id FROM child_category WHERE name = ?`,
      [category_name]
    );

    if (categoryRows.length === 0) {
      throw new Error("Category not found");
    }

    const childCategoryId = categoryRows[0].id;

    const [insertResult] = await pool.query(
      `INSERT INTO slug (name, child_category_id) VALUES (?, ?)`,
      [slug_name, childCategoryId]
    );

    return insertResult;
  } catch (error) {
    console.error("Error in addslugsbyname:", error);
    throw error;
  } 
};
