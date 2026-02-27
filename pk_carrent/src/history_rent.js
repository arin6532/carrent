import express from 'express';
import { connectToDatabase, queryDatabase } from './db_connect.js';

const router = express.Router();
connectToDatabase();

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  console.log("Current userId:", userId);

  try {
    const history_rentals = await queryDatabase(
      `SELECT r.rentals_id AS booking_id,
              r.user_id,
              r.start_date,
              r.end_date,
              r.total_price,
              r.status,
              r.created_at,
              r.rental_type,
              c.brand,
              c.model,
              c.image_url
       FROM carrent.rentals r
       JOIN carrent.cars c ON r.cars_id = c.cars_id
       WHERE r.user_id = $1
       ORDER BY r.created_at DESC`,
      [userId]
    );

    // แปลงข้อมูลให้ตรงกับโครงสร้างที่ frontend ต้องการ
    const formattedData = history_rentals.map(row => ({
      booking_id: row.booking_id,
      user_id: row.user_id,
      start_date: row.start_date,
      end_date: row.end_date,
      total_price: row.total_price,
      status: row.status,
      created_at: row.created_at,
      rental_type: row.rental_type,
      car: {
        brand: row.brand,
        model: row.model,
        image_url: row.image_url
      }
    }));

    res.json(formattedData);

  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
