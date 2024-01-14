const mongoose = require('mongoose');
//TODO: add the true option
const QuizSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: [String], //let's say that always the first element in array is true (for now)
        required: true,
    },
});

module.exports = mongoose.model('quiz', QuizSchema);
