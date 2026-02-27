import express from "express";
import { connectToDatabase, queryDatabase } from "./db_connect.js";

const router = express.Router();

// เรียก connectToDatabase() หนึ่งครั้ง
connectToDatabase();

// รถที่ว่างสำหรับหน้า Home ก่อน login
router.get("/", async (_req, res) => {
  try {
    const result = await queryDatabase(
      `SELECT cars_id, brand, model, year,
              price_per_day, price_per_week, status, image_url
       FROM carrent.cars
       WHERE status = 'available'
       ORDER BY cars_id ASC`
    );

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(500).json({ error: "Query failed" });
    }
  } catch (err) {
    console.error("Error fetching cars for home:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
