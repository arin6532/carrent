import express from "express";
import { connectToDatabase, queryDatabase } from "./db_connect.js";

const router = express.Router();

// เชื่อมฐานข้อมูล (ครั้งเดียวพอ ถ้าอยู่ใน main server ใช้ที่เดียวพอ)
connectToDatabase();

router.get("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  console.log("Received request for user ID:", userId);

  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const result = await queryDatabase(
      "SELECT full_name FROM carrent.carrent_users WHERE user_id = $1",
      [userId]
    );

    console.log("DB result:", result);
    if (result && result.length > 0) {
      console.log("Full name found:", result[0].full_name);
      return res.json({ fullName: result[0].full_name });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user name:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
