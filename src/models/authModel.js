const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoleEnum = Object.freeze({
    USER: 'USER',
    ADMIN: 'ADMIN'
});

const authSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(RoleEnum),
        required: true
    },
    createdAt: { type: Date, default: Date.now },
}, {
    timestamps: true
});

module.exports = mongoose.model('Auth', authSchema);
