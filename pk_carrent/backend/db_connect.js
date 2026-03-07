/* eslint-env node */
import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || undefined,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.DATABASE_URL
    ? { rejectUnauthorized: false }
    : false
});

const queryDatabase = async (query, params) => {
  try {
    const result = await pool.query(query, params);
    return result.rows;
  } catch (err) {
    console.error("Query error", err);
    return null;
  }
};

export { queryDatabase };