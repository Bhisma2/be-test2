const express = require('express');
const router = express.Router();
const UserDetail = require('../models/userDetailModel');

router.get('/user-detail/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const userDetail = await UserDetail.findOne({ user: userId }).populate('user', 'username email');
        if (!userDetail) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }
        res.status(200).json({
            code: 200,
            message: 'Berhasil mendapatkan data detail pengguna',
            data: userDetail
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error' });
    }
});

router.post('/user-detail', async (req, res) => {
    try {
        const { user, invoice_history } = req.body;
        const newUserDetail = new UserDetail({ user, invoice_history });
        await newUserDetail.save();
        res.status(201).json({
            code: 200,
            message: 'Berhasil menambahkan data detail pengguna',
            data: newUserDetail
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error' });
    }
});

module.exports = router;
