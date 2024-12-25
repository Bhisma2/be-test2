const express = require('express');
const router = express.Router();
const DamageReporting = require('../models/damageReport');

router.post('/damage-report', async (req, res) => {
    try {
        const { user, message } = req.body;
        const newReport = new DamageReporting({ user, message });
        await newReport.save();
        res.status(201).json({
            code: 200,
            message: 'Berhasil menambahkan report damage',
            data: newReport
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error' });
    }
});

router.get('/damage-report', async (req, res) => {
    try {
        const reports = await DamageReporting.find().populate('user', 'username email');
        res.status(200).json({
            code: 200,
            message: 'Berhasil mendapatkan seluruh report damage',
            data: reports
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error' });
    }
});

module.exports = router;
