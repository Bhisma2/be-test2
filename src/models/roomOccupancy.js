const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomOccupancySchema = new Schema({
    empty: { type: Number, required: true },
    filled: { type: Number, required: true }
});

module.exports = mongoose.model('RoomOccupancy', roomOccupancySchema);
