const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,      
        maxlength: 60,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 100000,
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
    description: {      //TODO whats that for?
        type: String,
        required: true,
        minlength: 0,      
        maxlength: 100,
    },
    solutionFileName: {
        type: String,
        default: "",
    },
    soulutionCode: {
        type: String,
        default: ""
    },
    ratings: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          rating: { type: Number, required: true, min: 1, max: 5 },
          comment: { type: String, default: "" },
        },
    ],
});

module.exports = mongoose.model('products', ProductSchema);
