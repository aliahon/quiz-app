const QuizModel = require("../models/QuizModel");
const Session = require("../models/SessionModel");
const User = require("../models/UserModel");
const ExcelJS = require('exceljs');
const nodemailer = require('nodemailer');
const { getUsersMarks } = require("./UserController.js");


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
    }).sort({ createdAt: -1 });

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
  const session = await Session.findOne({ isActive: true });

  const {endTime } = session;
  const currentTime = new Date();
  if (currentTime > new Date(endTime)) {
    await Session.updateMany({ isActive: true }, { isFinished: true, isActive: false });

    // Generate Excel file
    const data = await getUsersMarks(); // Ensure you have a function to get the necessary data
    const excelBuffer = await generateExcelFile(data);

    // Send email with the generated Excel file
    await sendEmailWithAttachment(
      'nohaila09el@gmail.com', // Replace with the admin email
      'Session Expired Report',
      'The session has expired. Please find the attached report.',
      excelBuffer,
      'session_expired_report.xlsx'
    );
  }

  next();
};

const generateExcelFile = async({ data }) => {
  //here I have to add the generetion of the excel
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Quiz Marks');
  worksheet.columns = [
    { header: 'Nom Complet de condidat', key: 'name', width: 30 },
    { header: 'Nom utilsateur', key: 'username', width: 30 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Note', key: 'mark', width: 30 },
  ];

  data.forEach(item => {
    worksheet.addRow({
      name: item.name,
      username: item.username,
      email: item.email,
      fullMark: item.fullMark,
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};

const sendEmailWithAttachment = async (to, subject, text, attachmentBuffer, filename) => {

  // Configure transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
      user: 'nohaila09el@gmail.com',
      pass: '10214ailaEL',
    },
  });

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



