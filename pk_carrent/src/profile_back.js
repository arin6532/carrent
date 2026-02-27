// profile_back.js
import express from 'express';
import bcrypt from 'bcryptjs';
import { connectToDatabase, queryDatabase } from './db_connect.js';

const router = express.Router();

// เชื่อมต่อฐานข้อมูล (สมมติฟังก์ชัน connectToDatabase มีอยู่ใน db_connect.js)
connectToDatabase();

// ดึงข้อมูลผู้ใช้ ตาม userId
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await queryDatabase(
      'SELECT username, full_name, phone, email FROM carrent.carrent_users WHERE user_id = $1',
      [userId]
    );

    if (result && result.length > 0) {
      return res.status(200).json(result[0]);
    }

    res.status(404).json({ error: 'User not found' });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// แก้ไขข้อมูลผู้ใช้ (update) พร้อม hash password ถ้ามีการกรอกใหม่
router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { username, password, fullName, phone, email } = req.body;
  console.log("PUT /user/:userId", userId, req.body);

  try {
    let query = '';
    let params = [];

    if (password && password.trim() !== '') {
      // hash password ก่อนเก็บ
      const hashedPassword = await bcrypt.hash(password, 10);
      query = `
        UPDATE carrent.carrent_users
        SET username = $1, password = $2, full_name = $3, phone = $4, email = $5
        WHERE user_id = $6
      `;
      params = [username, hashedPassword, fullName, phone, email, userId];
    } else {
      query = `
        UPDATE carrent.carrent_users
        SET username = $1, full_name = $2, phone = $3, email = $4
        WHERE user_id = $5
      `;
      params = [username, fullName, phone, email, userId];
    }

    console.log("Executing query:", query);
    console.log("With params:", params);

    const result = await queryDatabase(query, params);
    console.log("Query result:", result);

    // เนื่องจาก queryDatabase ส่งค่า [] กลับมา และข้อมูลอัปเดตสำเร็จในฐานข้อมูลแล้ว
    // ถ้า query ไม่ throw error แสดงว่าอัปเดตสำเร็จ
    return res.status(200).json({ 
      message: 'User updated successfully',
      success: true 
    });
    
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;