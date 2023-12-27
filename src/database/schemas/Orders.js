const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        min: 0,
        max: 100000,
    },
    cost: {
        type: Number,
        required: true,
        min: 0,
        max: 100000,
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    type: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user',
    },
    date: {
        type: Date,  
        required: true,
        default: Date.now,  
    },
    products_id: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
});

module.exports = mongoose.model('orders', OrderSchema);
