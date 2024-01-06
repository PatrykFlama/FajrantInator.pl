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
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        default: [],
    }],
    addedProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        default: [],
    }],
});

module.exports = mongoose.model('users', UserSchema);
