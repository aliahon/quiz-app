const Session = require("../models/SessionModel");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const getUsers = async (_req, res) => {
  // find all users except admin
  const users = await User.find({ role: { $ne: "admin" } }, { password: 0 });
  res.status(200).json(users);
};

const addUser = async (req, res) => {
  const { username, name, email, password, passwordConfirm } = req.body;

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

  res.status(200).json({
    message: "User created",
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
  const marks = await Session.find({
    isFinished: true,
  }).populate("userId", "-password");
  res.status(200).json(marks);
};

module.exports = { getUsers, addUser, deleteUser, getUsersMarks };
