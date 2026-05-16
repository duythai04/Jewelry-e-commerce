import pool from "../config/db.js";

export const UserModel = {
  // tìm theo email
  async findByEmail(email) {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0];
  },

  // tạo user
  async create(user) {
    const { full_name, email, password, phone, avatar } = user;

    const [result] = await pool.query(
      `INSERT INTO users 
      (full_name, email, password, phone, avatar) 
      VALUES (?, ?, ?, ?, ?)`,
      [full_name, email, password, phone || null, avatar || null]
    );

    return result.insertId;
  },

  // tìm theo id
  async findById(id) {
    const [rows] = await pool.query(
      "SELECT id, full_name, email, phone, avatar, role FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
  },
};