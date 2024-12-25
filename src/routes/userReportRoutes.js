const express = require('express');
const router = express.Router();
const UseReport = require('../models/userReportModel');

router.get('/report', async (req, res) => {
    try {
        const reports = await UseReport.find();
        res.status(200).json({
            code: 200,
            message: 'Berhasil mendapatkan seluruh report',
            data: reports
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error' });
    }
});

router.post('/report', async (req, res) => {
    try {
        const { user, room_number, usage_details } = req.body;

        const newReport = new UseReport({
            user,
            room_number,
            usage_details
        });

        await newReport.save();
        res.status(201).json({
            code: 200,
            message: 'Berhasil menambahkan report',
            data: newReport
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error' });
    }
});

router.get('/report/room/:room_number', async (req, res) => {
    try {
        const { room_number } = req.params;

        const reports = await UseReport.find({ room_number });
        res.status(200).json({
            code: 200,
            message: `Berhasil mendapatkan report untuk room ${room_number}`,
            data: reports
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error' });
    }
});

module.exports = router;
