import pool from "./db.js";

const connectDB = async () => {
  try {
    const connection = await pool.getConnection();

    console.log("MySQL Connected");

    connection.release();
  } catch (error) {
    console.log("Database connection failed");
    console.log(error.message);
  }
};

export default connectDB;