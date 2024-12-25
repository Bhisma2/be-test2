const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaymentMethodEnum = Object.freeze({
    QRIS: 'QRIS',
    BANK_TRANSFER: 'BANK_TRANSFER'
});

const paymentSchema = new Schema({
    total_bill: { type: Number, required: true },
    payment_method: {
        type: String,
        enum: Object.values(PaymentMethodEnum),
        required: true
    },
    rent_periods: {
        type: Number,
        enum: [3, 6],
        required: true
    }
});

module.exports = mongoose.model('Payment', paymentSchema);
