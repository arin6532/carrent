/* eslint-env node */
import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// ฟังก์ชันสำหรับเชื่อมต่อฐานข้อมูล
const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL!");
  } catch (err) {
    console.error("Connection error", err.stack);
  }
};

// ฟังก์ชันสำหรับคิวรีข้อมูล
const queryDatabase = async (query, params) => {
  try {
    const result = await client.query(query, params);
    return result.rows;
  } catch (err) {
    console.error("Query error", err.stack);
    return null;
  }
};

// ปิดการเชื่อมต่อ
const closeConnection = async () => {
  await client.end();
  console.log("Disconnected from PostgreSQL");
};

export { connectToDatabase, queryDatabase, closeConnection };