import express from 'express';
import bcrypt from 'bcryptjs';
import { connectToDatabase, queryDatabase } from './db_connect.js';

const router = express.Router();

// เชื่อมต่อฐานข้อมูล
connectToDatabase();

router.post('/', async (req, res) => {
  try {
    // console.log('Register request body:', req.body);

    const { regis_Username, regis_Password, regis_Fullname, regis_Email, regis_Phone } = req.body;

    const checkUser = await queryDatabase(
      'SELECT * FROM carrent.carrent_users WHERE username = $1',
      [regis_Username]
    );

    console.log('Check user result:', checkUser);

    if (!Array.isArray(checkUser)) {
      console.error('DB response is not an array');
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (checkUser.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(regis_Password, 10);
    console.log('Hashed password:', hashedPassword);

    const result = await queryDatabase(
      'INSERT INTO carrent.carrent_users (username, password, full_name, email, phone) VALUES ($1, $2, $3, $4, $5) RETURNING user_id',
      [regis_Username, hashedPassword, regis_Fullname, regis_Email, regis_Phone]
    );

    console.log('Insert result:', result);

    if (result && result.length > 0) {
      return res.status(201).json({
        message: 'User registered successfully',
        userID: result[0].user_id  // เปลี่ยนจาก id เป็น user_id
      });
    } else {
      return res.status(500).json({ message: 'Failed to register user' });
    }

  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;