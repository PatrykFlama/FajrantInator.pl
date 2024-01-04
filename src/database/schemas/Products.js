const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,      
        maxlength: 20,
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
    solutionDescription: {
        type: String,
        required: true,
        minlength: 0,      //TODO change to 10
        maxlength: 100,
    },
    solutionFileName: {        // TODO monad here?
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
        },
    ],
});

module.exports = mongoose.model('products', ProductSchema);
