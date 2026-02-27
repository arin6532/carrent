// car_list_back.js
import express from 'express';
import { connectToDatabase, queryDatabase } from './db_connect.js';

console.log("✅ booking_carlist.js loaded");
const router = express.Router();
connectToDatabase();

// ดึงรายชื่อรถทั้งหมดที่ว่าง
router.get('/', async (req, res) => {
  try {
    const result = await queryDatabase(
      `SELECT * FROM carrent.cars WHERE status = 'available'`
    );
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching car data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
