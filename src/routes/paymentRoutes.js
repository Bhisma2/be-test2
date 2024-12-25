const express = require('express');
const router = express.Router();
const Payment = require('../models/paymentModels');

router.get('/payment', async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json({
            code: 200,
            message: 'Berhasil mendapatkan seluruh payment',
            data: payments
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error' });
    }
});

router.post('/payment', async (req, res) => {
    try {
        const { total_bill, payment_method, rent_periods } = req.body;

        const newPayment = new Payment({
            total_bill,
            payment_method,
            rent_periods
        });

        await newPayment.save();
        res.status(201).json({
            code: 200,
            message: 'Berhasil menambahkan payment',
            data: newPayment
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error' });
    }
});

module.exports = router;
