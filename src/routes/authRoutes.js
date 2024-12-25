const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const config = require('../config/configAuth');
const UserModel = require('../models/authModel');

router.get('/user', async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: 'tidak ada token'
            });
        }

        const decoded = jwt.verify(token, config.jwtSecret);

        const userId = decoded.user.id;

        const user = await UserModel.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }

        return res.status(200).json({
            code: 200,
            message: "Success Get User!",
            data: user,
        });
    } catch (error) {
        console.error(error.message);
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Error' });
    }
});


router.post('/register', async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password, role } = req.body;

        let user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User Tersedia' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new UserModel({
            username,
            email,
            password: hashedPassword,
            role
        });

        await user.save();

        return res.status(201).json({
            code: 200,
            message: 'Sukses',
            user
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'Kredensial salah!'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Kredensial salah!'
            });
        }

        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' }, (error, token) => {
            if (error) throw error;
            return res.status(200).json({
                code: 200,
                message: "Login Sukses",
                data: user,
                token
            });
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Error'
        });
    }
});

module.exports = router;
