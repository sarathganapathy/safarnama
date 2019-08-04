const express = require('express');
const {
  login,
  logout
} = require('../controllers/authorizationController');

const router = express.Router();

// methods for handling login.

router.post('/', login);
router.post('/logout', logout);

module.exports = router;
