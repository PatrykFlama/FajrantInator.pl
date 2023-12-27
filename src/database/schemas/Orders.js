const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
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
        default: 'defaultUsername',
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        default: 'defaultEmail@example.com',
    },
    accountType: {
        type: String,
        required: true,
        enum: ['user', 'admin', 'guest'], 
        default: 'guest',
    },
    date: {
        type: Date,  
        required: true,
        default: Date.now,  
    },
    products: [{        // array of products
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'products',
    }],
});

module.exports = mongoose.model('orders', OrderSchema);
