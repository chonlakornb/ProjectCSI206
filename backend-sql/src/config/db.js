import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost", // Update with your MySQL host
  user: "root",      // Update with your MySQL username
  password: "root",  // Update with your MySQL password
  database: "book_catalog", // Update with your MySQL database name
  charset: "utf8mb4", // Add this line to support Thai characters
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const connectDB = async () => {
  try {
    await pool.getConnection(); // Test the connection
    console.log("Connected to MySQL database successfully!");
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
    process.exit(1);
  }
};

export { pool, connectDB };
