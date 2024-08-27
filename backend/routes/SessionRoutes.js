const express = require("express");
const router = express.Router();
const {
  getUserSession,
  createSession,
  startSession,
  finishSession,
  createAdminSession,
  validateSession,
  sendEmail,
} = require("../controllers/SessionController");
const allowedRoles = require("../middleware/allowedRoles");
const { verifyToken } = require("../middleware/verifyToken");

router.get(
  "/get-user-session/:userId",
  verifyToken,
  validateSession,
  getUserSession
);
// router.post("/create-session", verifyToken, validateSession, createSession);
// router.put("/start-session", verifyToken, validateSession, startSession);
// router.put("/finish-session", verifyToken, validateSession, finishSession);
router.post(
  "/create-admin-session",
  verifyToken,
  allowedRoles(["admin"]),
  validateSession,
  createAdminSession
);

router.get(
  "/send-email",
  verifyToken,
  allowedRoles(["admin"]),
  validateSession,
  sendEmail
);

module.exports = router;
