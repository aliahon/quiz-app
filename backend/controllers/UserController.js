const { transporter } = require("../config/mailer");
const Session = require("../models/SessionModel");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const getUsers = async (_req, res) => {
  // find all users except admin
  const users = await User.find({ role: { $ne: "admin" } }, { password: 0 });
  res.status(200).json(users);
};

const getUser = async (_req, res) => {
  const {id} = _req.params;
  const oneUser = await User.findById(id);
  res.status(200).json(oneUser);
};

const addUser = async (req, res) => {
  const { username, name, email, password, passwordConfirm } = req.body;

  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Your Account Credentials",
    text: `Bonjour ${username},\n\nVotre compte a été créé. Voici vos informations de connexion :\n\nNom d'utilisateur : ${username}\nMot de passe : ${password}\n`,
  };

  // Validate email format
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (password !== passwordConfirm) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // create user with role user
  const user = await User.create({
    username,
    name,
    email,
    password: hashedPassword,
    role: "user",
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("User created and email sent");
    }
  });

  res.status(200).json({
    message: "User created",
    user: { _id: user._id, username: user.username },
  });
};


const updateUser = async (req, res) => {
  const { id} = req.params;
  const user = await User.findByIdAndUpdate(id, req.body);

  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "La modification de vos informations de connexion",
    text: `Bonjour ${username},\n\nVotre compte a été modifié. Voici vos informations de connexion :\n\nNom d'utilisateur : ${username}\nMot de passe : ${password}\n`,
  };

  // Validate email format
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (password !== passwordConfirm) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("User updateded and email sent");
    }
  });

  res.status(200).json({
    message: "User updateded",
    user: { _id: user._id, username: user.username },
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  // delete user by id
  await User.findByIdAndDelete(id);
  res.status(200).json({ message: "User deleted" });
};

const getUsersMarks = async (req, res) => {
  /*const marks = await Session.find({
    isFinished: true,
  }).populate("userId", "-password");*/

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
    
  
   
  res.status(200).json(marks);
};

module.exports = { getUsers,getUser, addUser,updateUser, deleteUser, getUsersMarks };
