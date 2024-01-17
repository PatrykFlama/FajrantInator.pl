const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    cost: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
        default: 'guest',
    },
    email: {
        type: String,
        required: true,
        default: '',
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
