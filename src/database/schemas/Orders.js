const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,      
        maxlength: 20,
    },
    description: {
        type: String,
        required: true,
        minlength: 0,      //TODO change to 10
        maxlength: 100,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 100000,
    },
    image: {
        type: String,
        //required: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    listNumber: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
    },
    taskNumber: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
    },
    solution: {     //TODO idk whats that for now
        type: String,
        required: true,
    },
});

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
    type: {
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
    products: [ProductSchema],
});

module.exports = mongoose.model('orders', OrderSchema);
