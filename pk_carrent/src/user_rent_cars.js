// user_rent_cars.js
import express from 'express';
import { connectToDatabase, queryDatabase } from './db_connect.js';

const router = express.Router();

connectToDatabase();

router.post('/', async (req, res) => {
  try {
    const { user_id, cars_id, rental_type, start_date, end_date, price } = req.body;

    // 🔒 ตรวจสอบสถานะรถก่อนเช่า
    const checkQuery = `SELECT status FROM carrent.cars WHERE cars_id = $1`;
    const result = await queryDatabase(checkQuery, [cars_id]);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (result[0].status !== "available") {
      return res.status(400).json({ message: "Car is not available for rental" });
    }

    // ✅ Insert rental record
    const insertQuery = `
      INSERT INTO carrent.rentals 
      (user_id, cars_id, rental_type, start_date, end_date, total_price)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const insertParams = [user_id, cars_id, rental_type, start_date, end_date, price];
    await queryDatabase(insertQuery, insertParams);

    // ✅ Update car status
    const updateQuery = `
      UPDATE carrent.cars
      SET status = 'rental'
      WHERE cars_id = $1
    `;
    await queryDatabase(updateQuery, [cars_id]);

    res.status(201).end();
  } catch (error) {
    console.error('Error creating rental:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;