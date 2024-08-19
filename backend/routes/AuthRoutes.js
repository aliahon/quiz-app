const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = process.env.ACCESS_TOKEN_SECRET || "secret";

function generateAccessToken({ username, _id, role, email, name }) {
  return jwt.sign({ username, _id, role, email, name }, secretKey, {
    expiresIn: "1h",
  });
}

function validateToken(req, res, next) {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        res.clearCookie("token");
        return res.status(403).json({ message: "Unauthorized User" });
      }
      req.user = user;
      req.token = token;
      return next();
    });
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const [_, accessToken] = req.headers?.authorization?.split(" ");

    if (!accessToken) {
      return res.status(403).json({ message: "Unauthorized User" });
    }

    jwt.verify(accessToken, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Unauthorized User" });
      }

      req.user = user;
      return next();
    });
  } else {
    return res.status(403).json({ message: "Unauthorized User" });
  }
}

router.post("/login", async (req, res) => {
  const { credentials, password } = req.body;

  let user;
  if (credentials.includes("@")) {
    user = await User.findOne({ email: credentials });
  } else {
    user = await User.findOne({ username: credentials });
  }
  if (!user) {
    return res.status(404).json("Utilisateur non trouvé");
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json("Mot de passe incorrect");
  }

  const token = generateAccessToken(user);
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.cookie("token", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "prod",
    secure: true,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: "lax",
  });

  const userToReturn = {
    username: user.username,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return res.status(200).json({ token, user: userToReturn });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out" });
});

router.get("/account", validateToken, (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // res.header("Access-Control-Allow-Origin", "*");
  return res.status(201).json({ user: { ...req.user }, token: req.token });
});

module.exports = router;
