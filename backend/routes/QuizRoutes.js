const express = require("express");
const router = express.Router();
const { getQuiz, answerQuestion } = require("../controllers/QuizController");
const allowedRoles = require("../middleware/allowedRoles");
const { verifyToken } = require("../middleware/verifyToken");
const { validateSession } = require("../controllers/SessionController");

router.get(
  "/",
  verifyToken,
  allowedRoles(["admin", "user"]),
  validateSession,
  getQuiz
);
router.post(
  "/answer",
  verifyToken,
  allowedRoles(["admin", "user"]),
  validateSession,
  answerQuestion
);

module.exports = router;
