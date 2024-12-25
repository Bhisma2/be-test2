const express = require("express");
const connectDB = require("../config/connectMongo");
const dotenv = require("dotenv");

const authRoutes = require('../routes/AuthRoutes');
const damageReportingRoutes = require('../routes/damageReportingRoutes');
const invoiceHistories = require('../routes/invoiceHistoriesRoutes');
const paymentRoutes = require('../routes/paymentRoutes');
const userReportRoutes = require('../routes/userReportRoutes');
const roomOccupancyRoutes = require('../routes/roomOccupancyRoutes');
const userDetailRoutes = require('../routes/userDetailRoutes');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.get('/', (_, res) => {
    res.send('aman yak');
});

app.use("/api/auth", authRoutes);
app.use("/api", damageReportingRoutes);
app.use("/api", invoiceHistories);
app.use("/api", paymentRoutes);
app.use("/api", userReportRoutes);
app.use("/api", roomOccupancyRoutes);
app.use("/api", userDetailRoutes);

module.exports = app;
