const mongoose = require('mongoose');
const { Schema } = mongoose;
const invoiceHistorySchema = require('./invoiceModel').schema;

const userDetailSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Auth', required: true },
    invoice_history: invoiceHistorySchema
});

module.exports = mongoose.model('UserDetail', userDetailSchema);
