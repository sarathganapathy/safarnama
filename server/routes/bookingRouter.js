const express = require('express');
const passport = require('passport');
const {
  getAllBookings,
  createBooking,
  updateBooking,
  getBookingById,
  deleteBooking
} = require('../controllers/bookingController');
require('../config/passportConfig')(passport);

const router = express.Router();

// methods for handling bookings.

router.get("/", getAllBookings);

router.post("/", passport.authenticate('jwt', { session: false }), createBooking);

router.get("/:bookingId", getBookingById);

router.patch("/:bookingId", passport.authenticate('jwt', { session: false }), updateBooking);

router.put("/:bookingId", passport.authenticate('jwt', { session: false }), updateBooking);

router.delete("/:bookingId", passport.authenticate('jwt', { session: false }), deleteBooking);

module.exports = router;
