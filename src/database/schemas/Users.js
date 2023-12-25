const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 50,
    },
    type: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user',
    },
    cart: {
        type: [String],
        default: [],
    },
    orders: {
        type: [String],
        default: [],
    },
});

module.exports = mongoose.model('users', UserSchema);
