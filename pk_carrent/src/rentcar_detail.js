import express from 'express';
import { connectToDatabase, queryDatabase } from './db_connect.js';

const router = express.Router();

connectToDatabase();

router.get('/:car_id', async (req, res) => {
    const carId = req.params.car_id;
    try {
        const result = await queryDatabase(
            `SELECT * FROM carrent.cars WHERE cars_id = $1`, [carId]
        );

        // console.log("data:", result);

        if (result.length === 0) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.status(200).json(result[0]);
    } catch (error) {
        console.error('Error fetching car details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
