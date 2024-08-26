const { transporter } = require("../config/mailer");
const QuizModel = require("../models/QuizModel");
const Session = require("../models/SessionModel");
const User = require("../models/UserModel");
const ExcelJS = require('exceljs');

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
  let emailSent = false;
  await Promise.all(
    sessions.map(async (session) => {
      const { startTime, endTime } = session;
      const currentTime = new Date();
      if (currentTime > new Date(endTime)) {
        session.isFinished = true;
        session.isActive = false;
        await session.save();
        if (!emailSent) {  // Send email only if it hasn't been sent yet
          //const data = await getUsersMarks();  // Ensure you have a function to get the necessary data
          const excelFile = await generateExcelFile(data);

          // Send email with the generated Excel file
          await sendEmailWithAttachment(
            'nohaila09el@gmail.com', // Replace with the admin email
            'Session Expired Report',
            'The session has expired. Please find the attached report.',
            excelFile,
            'session_expired_report.xlsx'
          );

          emailSent = true;  // Set flag to true to prevent further emails
        }
      }
    })
  );

  next();
};

const getUsersMarks = async () => {
  /*const marks = await Session.find({
    isFinished: true,
  }).populate("userId", "-password");*/

  const marks = await Session.aggregate([
    {
      $match: { isFinished: true } // Match only completed sessions
    },
    {
      $group: {
        _id: "$startTime", // Group by startTime
        sessions: { $push: "$$ROOT" }, // Collect all sessions in an array
        count: { $sum: 1 } // Count the number of sessions per startTime
      }
    },
    {
      $sort: { _id: -1 } // Sort by startTime in descending order (most recent first)
    }])


  return marks[0].sessions;
};

const generateExcelFile = async ({ data }) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Quiz Marks');
  worksheet.columns = [
    { header: 'Nom Complet de condidat', key: 'name', width: 60 },
    { header: 'Nom utilsateur', key: 'username', width: 60 },
    { header: 'Email', key: 'email', width: 60 },
    { header: 'Note', key: 'mark', width: 60 },
  ];

  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      console.log(`Element ${index}:`, item);
      console.log(`Type of element ${index}:`, typeof item);
    });
  } else {
    console.error('Expected data to be an array but got:', data);
  }/*
  data.forEach(item => {
    worksheet.addRow({
      name: item?.userId?.name,
      username: item?.userId?.username,
      email: item?.userId?.email ,
      fullMark: item.fullMark,
    });
  });*/

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};

const sendEmailWithAttachment = async (to, subject, text, attachmentBuffer, filename) => {

  // Setup email data
  const mailOptions = {
    from: 'nohaila09el@gmail.com',
    to,
    subject,
    text,
    attachments: [
      {
        filename,
        content: attachmentBuffer,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  getUserSession,
  createSession,
  createAdminSession,
  startSession,
  finishSession,
  validateSession,
};



