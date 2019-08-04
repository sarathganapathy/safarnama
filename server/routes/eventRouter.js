const express = require('express');
const multer = require('multer');
const passport = require('passport');
const {
  getAllEvents,
  createEvent,
  updateEvent,
  getEventById,
  deleteEvent
} = require('../controllers/eventController');
const { LOCAL_PATHS, REGEX } = require('../constants/constants');
require('../config/passportConfig')(passport);

// Multer disk storage for storing upladed images.
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `./${LOCAL_PATHS.IMAGE_PATH}/`);
  },
  filename(req, file, cb) {
    // replacing : with - to support windows relative path
    cb(null, new Date().toISOString().replace(REGEX.COLON_MATCH, '-') + file.originalname);
  }
});

/**
 * Funtion for filtering the images
 * @param {Object} req - request object
 * @param {Object} file - response object
 * @param {Function} cb - call back function
 * @return {undefined } this function does not return any value
 */
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// creates the multer object.
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

const router = express.Router();

// methods for handling events.

router.get("/", getAllEvents);

router.post("/", upload.array('photos', 3), createEvent); // Need to add authorization

router.get("/:eventId", getEventById);

router.patch("/:eventId", passport.authenticate('jwt', { session: false }), updateEvent);

router.put("/:eventId", passport.authenticate('jwt', { session: false }), updateEvent);

router.delete("/:eventId", passport.authenticate('jwt', { session: false }), deleteEvent);

module.exports = router;
