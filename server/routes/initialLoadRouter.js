const express = require('express');
const { getInitialData } = require('../controllers/initialLoadController');

const router = express.Router();

/**
 * @desc router to get the initial safarnama data on page load
 * Router calls the initialLoadControl to get the required data.
 */
router.route('/')
  .get(getInitialData);

module.exports = router;
