const QuizModel = require("../models/QuizModel");
const Session = require("../models/SessionModel");
const User = require("../models/UserModel");

const getUserSession = async (req, res) => {
  const userId = req.params.userId;
  try {
    const session = await Session.findOne({
      userId,
      isActive: true,
      isFinished: false,
    });

    const expiredSession = await Session.findOne({
      userId,
      isFinished: true,
      isActive: true,
    });

    if (!session && !expiredSession) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session) {
      return res.status(200).json({ session });
    }

    const totalQuizMarks = await QuizModel.aggregate([
      {
        $group: {
          _id: null,
          totalMarks: { $sum: "$mark" },
        },
      },
    ]);

    return res.status(200).json({
      expiredSession,
      totalMarks: totalQuizMarks?.[0]?.totalMarks || 0,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error getting user session", error });
  }
};

const createSession = async (req, res) => {
  const { userId } = req.body;
  await Session.create({ userId });
  return res.status(201).json({ message: "Session created" });
};

const createAdminSession = async (req, res) => {
  const { startTime: START_TIME, endTime: END_TIME } = req.body;

  const session = await Session.countDocuments({
    isActive: true,
    isFinished: false,
  });

  if (session > 0) {
    return res.status(400).json({ message: "Session already exists" });
  }

  const userIds = await User.find({ role: { $ne: "admin" } }, { _id: 1 });
  const startTime = new Date(START_TIME);
  const endTime = new Date(END_TIME);
  const currentTime = new Date();

  if(startTime>=endTime){
    return res.status(400).json({ message: "Start time must be earlier than end time." });
  }

  if(currentTime>=startTime){
    return res.status(400).json({ message: "Start time must be later than current time." });
  }

  await Promise.all(
    userIds.map(async (user) => {
      await Session.create({
        userId: user._id,
        startTime,
        endTime,
        isActive: true,
      });
    })
  );
  return res.status(201).json({ message: "Sessions created" });
};

const startSession = async (req, res) => {
  const { sessionId } = req.body;
  await Session.findOneAndUpdate({ _id: sessionId }, { isActive: true });
  return res.status(200).json({ message: "Session updated" });
};

const finishSession = async (req, res) => {
  const { sessionId } = req.body;
  await Session.findOneAndUpdate({ _id: sessionId }, { isActive: false });
  return res.status(200).json({ message: "Session updated" });
};

const validateSession = async (req, res, next) => {
  const sessions = await Session.find({ isActive: true });

  await Promise.all(
    sessions.map(async (session) => {
      const { startTime, endTime } = session;
      const currentTime = new Date();
      if (currentTime > new Date(endTime)) {
        session.isFinished = true;
        await session.save();
      }
    })
  );

  next();
};

module.exports = {
  getUserSession,
  createSession,
  createAdminSession,
  startSession,
  finishSession,
  validateSession,
};
