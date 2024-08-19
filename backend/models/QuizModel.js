const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: Object,
    required: true,
  },
  images: {
    type: Array,
  },
  answer: {
    type: String,
    required: true,
  },
  mark: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Quiz", QuizSchema);
