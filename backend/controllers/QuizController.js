const Quiz = require("../models/QuizModel");
const Session = require("../models/SessionModel");

const getQuiz = async (req, res) => {
  const questionsCount = await Quiz.countDocuments();

  const userId = req.user._id;
  const session = await Session.findOne({ userId, isFinished: false });

  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  // Check if the current time is within the session's start and end time
  const { startTime, endTime } = session;
  const currentTime = new Date();

  if (currentTime < new Date(startTime) || currentTime > new Date(endTime)) {
    return res.status(400).json({ message: "Session not active" });
  }

  const answeredCount = session.answeredCount;

  const answeredQuestions = session.answeredQuestions;
  const question = await Quiz.aggregate([
    { $match: { _id: { $nin: answeredQuestions } } },
    { $sample: { size: 1 } },
    { $project: { answer: 0 } },
  ]).then((result) => result[0]);

  if (!question) {
    return res.status(404).json({ message: "No more questions available" });
  }
  res.status(200).json({
    question,
    questionsCount,
    answeredCount,
  });
};

const answerQuestion = async (req, res) => {
  // Extract questionId and answer from the request body
  const { questionId, answer } = req.body;
  // Get the userId from the authenticated user
  const userId = req.user._id;
  // Find the active and unfinished session for the user
  const session = await Session.findOne({
    userId,
    isFinished: false,
    isActive: true,
  });

  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  // Check if the current time is within the session's start and end time
  const { startTime, endTime } = session;
  const currentTime = new Date();
  if (currentTime < new Date(startTime) || currentTime > new Date(endTime)) {
    return res.status(400).json({ message: "Session not active" });
  }

  // find the questions count
  const questionsCount = await Quiz.countDocuments();

  // Find the question by its ID
  const question = await Quiz.findOne({ _id: questionId });
  if (!question) {
    // If the question is not found, return a 404 error
    return res.status(404).json({ message: "Question not found" });
  }

  // Check if the provided answer is correct
  const isCorrect = question.answer === answer;
  if (isCorrect) {
    // If the answer is correct, add the question's mark to the session's fullMark
    session.fullMark += question.mark;
  }
  // Increment the count of answered questions
  session.answeredCount++;
  // If all questions have been answered, mark the session as finished
  if (session.answeredCount === session.questionsCount) {
    session.isFinished = true;
  }
  // Add the questionId to the list of answered questions
  if (session.answeredQuestions) {
    session.answeredQuestions.push(questionId);
  } else {
    session.answeredQuestions = [questionId];
  }

  if (session.answeredCount === questionsCount) {
    session.isFinished = true;
  }

  await session.save();

  res.status(200).json({
    message: "Answer submitted",
    session,
  });
};

module.exports = {
  getQuiz,
  answerQuestion,
};
