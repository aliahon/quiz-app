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
  const session = await Session.findOne({ isActive: true });

  if (!session) {
    next();
  }
  else {
    const { endTime } = session;
    const currentTime = new Date();
    if (currentTime > new Date(endTime)) {

      await Session.updateMany({ isActive: true }, { isFinished: true, isActive: false });
    }
    next();
  }

};


const sendEmail = async (_, res) => {
  const data = await getUsersMarks();
  const excelFile = await generateExcelFile({ data });
  try {
    
    // Send email with the generated Excel file
    await sendEmailWithAttachment(
      'nohaila09el@gmail.com',
      'Rapport de la dernière session',
      'Bonjour,\n\nVeuillez trouver ci-joint le rapport de la dernière session.',
      excelFile,
      'rapport_de_derniere_session.xlsx'
    );
    return res.status(200).json("email sent successfully")
  } catch (error) {
    return res.status(400).json("something went wrong")
    
  }


};

const getUsersMarks = async () => {

  const marks = await Session.aggregate([
    {
      $match: { isFinished: true } // Match only completed sessions
    },
    {
      $lookup: {
        from: 'users', // The collection to join
        localField: 'userId', // Field from the input documents
        foreignField: '_id', // Field from the documents of the "users" collection
        as: 'user' // Name of the array field to add to the output documents
      }
    },
    {
      $unwind: {
        path: '$user', // Deconstructs the array field
        preserveNullAndEmptyArrays: true // Optional: include sessions without a matching user
      }
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

  data.forEach(item => {
    worksheet.addRow({
      name: item?.user?.name,
      username: item?.user?.username,
      email: item?.user?.email,
      mark: item.fullMark,
    });
  });

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

  
    await transporter.sendMail(mailOptions);
};

module.exports = {
  getUserSession,
  createSession,
  createAdminSession,
  startSession,
  finishSession,
  validateSession,
  sendEmail,
};



