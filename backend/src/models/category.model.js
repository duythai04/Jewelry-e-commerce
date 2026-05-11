import pool from "../config/db.js";


export const getCategoryBySlug = async (slug) => {
  const sql = `SELECT * FROM categories WHERE slug = ? LIMIT 1`;
  const [rows] = await pool.execute(sql, [slug]);
  return rows[0]; 
};