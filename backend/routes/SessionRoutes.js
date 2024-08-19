const express = require("express");
const router = express.Router();
const {
  getUserSession,
  createSession,
  startSession,
  finishSession,
  createAdminSession,
  validateSession,
} = require("../controllers/SessionController");
const allowedRoles = require("../middleware/allowedRoles");
const { verifyToken } = require("../middleware/verifyToken");

router.get(
  "/get-user-session/:userId",
  verifyToken,
  validateSession,
  getUserSession
);

router.post(
  "/create-admin-session",
  verifyToken,
  allowedRoles(["admin"]),
  validateSession,
  createAdminSession
);

module.exports = router;
