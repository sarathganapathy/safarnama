const express = require('express');
const passport = require('passport');
const {
  getAllUsers,
  createUser,
  updateUser,
  getUserById,
  deleteUser
} = require('../controllers/userController');
require('../config/passportConfig')(passport);

const router = express.Router();

// methods for handling users.

router.get("/", getAllUsers);

router.post("/", passport.authenticate('jwt', { session: false }), createUser);

router.get("/:userId", getUserById);

router.patch("/:userId", passport.authenticate('jwt', { session: false }), updateUser);

router.put("/:userId", passport.authenticate('jwt', { session: false }), updateUser);

router.delete("/:userId", passport.authenticate('jwt', { session: false }), deleteUser);

module.exports = router;
