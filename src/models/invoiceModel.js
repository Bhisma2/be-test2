const mongoose = require('mongoose');
const { Schema } = mongoose;

const invoiceHistorySchema = new Schema({
    bill: { type: Number, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('InvoiceHistory', invoiceHistorySchema);
