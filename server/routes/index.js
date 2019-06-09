
const express = require('express');
const path = require('path');

const router = express.Router();

/**
 * @desc router to load the main html page from server.
 */
router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

module.exports = router;
