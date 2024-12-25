const express = require('express');
const router = express.Router();
const InvoiceHistory = require('../models/invoiceModel');

router.get('/invoice', async (req, res) => {
    try {
        const histories = await InvoiceHistory.find();
        res.status(200).json({
            code: 200,
            message: 'Berhasil mendapatkan seluruh invoice histories',
            data: histories
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error' });
    }
});

router.post('/invoice', async (req, res) => {
    try {
        const { bill } = req.body;
        const newInvoice = new InvoiceHistory({ bill });
        await newInvoice.save();
        res.status(201).json({
            code: 200,
            message: 'Berhasil menambahkan invoice history',
            data: newInvoice
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error' });
    }
});

module.exports = router;
