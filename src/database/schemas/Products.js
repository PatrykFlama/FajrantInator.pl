const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    listNumber: {
        type: Number,
        required: true,
    },
    taskNumber: {
        type: Number,
        required: true,
    },
    description: {      //TODO whats that for?
        type: String,
        required: true,
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
    author: {
        type: String,
        required: true,
        default: "admin",
    },
});

module.exports = mongoose.model('products', ProductSchema);
