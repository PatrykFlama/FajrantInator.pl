const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user',
    },
    check:{
        type: Boolean,
        required: true,
        default: false,
    },
    seller:{
        type: Boolean,
        required: true,
        default: false,
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
