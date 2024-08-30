const express = require("express");
const router = express.Router();
const allowedRoles = require("../middleware/allowedRoles");
const { verifyToken } = require("../middleware/verifyToken");

const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getUsersMarks,
} = require("../controllers/UserController");


router.get("/get-all-users", verifyToken, allowedRoles(["admin"]), getUsers);
router.get("/get-one-user/:id", verifyToken, allowedRoles(["admin"]), getUser);
router.post("/add-user", verifyToken, allowedRoles(["admin"]), addUser);
//Update user info
router.put(
  "/update-user/:id",
  verifyToken,
  allowedRoles(["admin"]),
  updateUser
);
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
