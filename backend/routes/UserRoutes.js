const express = require("express");
const router = express.Router();
const allowedRoles = require("../middleware/allowedRoles");
const { verifyToken } = require("../middleware/verifyToken");

const {
  getUsers,
  addUser,
  deleteUser,
  getUsersMarks,
} = require("../controllers/UserController");

router.get("/get-all-users", verifyToken, allowedRoles(["admin"]), getUsers);
router.post("/add-user", verifyToken, allowedRoles(["admin"]), addUser);
router.delete(
  "/delete-user/:id",
  verifyToken,
  allowedRoles(["admin"]),
  deleteUser
);
router.get(
  "/get-users-marks",
  verifyToken,
  allowedRoles(["admin"]),
  getUsersMarks
);

module.exports = router;
