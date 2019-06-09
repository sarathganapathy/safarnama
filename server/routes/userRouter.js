const express = require('express');
const {
  getAllUsers,
  createUser,
  updateUser,
  getUserById,
  deleteUser
} = require('../controllers/userController');

const router = express.Router();

// methods for handling users.

router.get("/", getAllUsers);

router.post("/", createUser);

router.get("/:userId", getUserById);

router.patch("/:userId", updateUser);

router.put("/:userId", updateUser);

router.delete("/:userId", deleteUser);

module.exports = router;
