const mongoose = require('mongoose');
const { Schema } = mongoose;

const damageReportingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Auth', required: true },
    message: { type: String, required: true }
});

module.exports = mongoose.model('DamageReporting', damageReportingSchema);
