const express = require('express');
const router = express.Router();
const RoomOccupancy = require('../models/roomOccupancy');

router.get('/occupancy', async (req, res) => {
    try {
        const occupancies = await RoomOccupancy.find();
        res.status(200).json({
            code: 200,
            message: 'Berhasil mendapatkan seluruh room occupancy',
            data: occupancies
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error' });
    }
});

router.post('/occupancy', async (req, res) => {
    try {
        const { room_number, is_occupied } = req.body;

        const newOccupancy = new RoomOccupancy({
            room_number,
            is_occupied
        });

        await newOccupancy.save();
        res.status(201).json({
            code: 200,
            message: 'Berhasil menambahkan room occupancy',
            data: newOccupancy
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error' });
    }
});

router.patch('/occupancy/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { is_occupied } = req.body;

        const occupancy = await RoomOccupancy.findByIdAndUpdate(
            id,
            { is_occupied },
            { new: true }
        );

        if (!occupancy) {
            return res.status(404).json({ message: 'Ruangan tidak ditemukan' });
        }

        res.status(200).json({
            code: 200,
            message: 'Berhasil memperbarui room occupancy',
            data: occupancy
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error' });
    }
});

module.exports = router;
