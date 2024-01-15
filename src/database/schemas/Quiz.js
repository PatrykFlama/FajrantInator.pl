const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: [
        {
          t: { type: String, required: true },
          f: { type: [String], required: true},
        },
    ],
});

module.exports = mongoose.model('quiz', QuizSchema);
