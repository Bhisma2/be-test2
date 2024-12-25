const mongoose = require('mongoose');
const { Schema } = mongoose;

const userReportSchema = new Schema({
    message: { type: String, required: true }
});

module.exports = mongoose.model('UserReport', userReportSchema);
