import pool from "../config/db.js";

export const userDetais = async() => {
    
  const sql = `
    select id,name,email,address,is_trader,is_verified from user;
  `;
  const [rows] = await pool.query(sql);
  return rows;
}