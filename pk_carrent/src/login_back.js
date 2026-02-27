// login_back.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase, queryDatabase } from './db_connect.js';

const router = express.Router();

// เชื่อมต่อฐานข้อมูล (เรียกแค่ครั้งเดียว)
connectToDatabase();

// สร้าง route สำหรับ login
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  
  // console.log('Received username:', username);
  // console.log('Received password:', password);

  try {
    const result = await queryDatabase(
      'SELECT * FROM carrent.carrent_users WHERE username = $1',
      [username]
    );

    // console.log('Query result:', result);

    if (!Array.isArray(result) || result.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = result[0];
    console.log('User password hash from DB:', user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { userId: user.user_id },
      'your_jwt_secret', // ใช้ตัวแปร environment แทนการเขียนตรงนี้ใน production
      { expiresIn: '7d' }
    );

    return res.json({ userId: user.user_id, token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;


// // login_back.js
// import express from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { connectToDatabase, queryDatabase } from './db_connect.js';

// const router = express.Router();

// // เชื่อมต่อฐานข้อมูล (เรียกแค่ครั้งเดียว)
// connectToDatabase();

// // สร้าง route สำหรับ login
// router.post('/', async (req, res) => {
//   const { username, password } = req.body;
  
//   console.log('Received username:', username);
//   console.log('Received password:', password); // ระวังอย่า log รหัสผ่านใน production

//   try {
//     const result = await queryDatabase(
//       'SELECT * FROM carrent.carrent_users WHERE username = $1',
//       [username]
//     );

//     console.log('Query result:', result);

//     if (!Array.isArray(result) || result.length === 0) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     const user = result[0];
//     console.log('User password hash from DB:', user.password);

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     console.log('Password valid:', isPasswordValid);

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     const token = jwt.sign(
//       { userId: user.id },
//       'your_jwt_secret', // แนะนำให้ใช้ตัวแปร environment แทนการเขียนตรงนี้ใน production
//       { expiresIn: '7d' }
//     );

//     return res.json({ userId: user.id, token });

//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// export default router;
