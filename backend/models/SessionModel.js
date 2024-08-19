const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isFinished: { type: Boolean, default: false },
  answeredQuestions: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  answeredCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: false },
  fullMark: { type: Number, default: 0 },
});

module.exports = mongoose.model("Session", SessionSchema);
