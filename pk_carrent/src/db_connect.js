// db_connect.js
import { Client } from 'pg';

// ตั้งค่าการเชื่อมต่อกับฐานข้อมูล PostgreSQL
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'your_password',  // ควรใช้วิธีที่ปลอดภัยในการเก็บรหัสผ่าน
  port: 5432,
});

// ฟังก์ชันสำหรับเชื่อมต่อฐานข้อมูล
const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL!');
  } catch (err) {
    console.error('Connection error', err.stack);
  }
};

// ฟังก์ชันสำหรับคิวรีข้อมูลจากฐานข้อมูล
const queryDatabase = async (query, params) => {
  try {
    const result = await client.query(query, params);
    return result.rows; // คืนค่า rows จากคิวรี
  } catch (err) {
    console.error('Query error', err.stack);
    return null;
  }
};

// ฟังก์ชันสำหรับปิดการเชื่อมต่อ
const closeConnection = async () => {
  await client.end();
  console.log('Disconnected from PostgreSQL');
};

export { connectToDatabase, queryDatabase, closeConnection };