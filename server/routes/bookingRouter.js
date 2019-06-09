const express = require('express');
const {
  getAllBookings,
  createBooking,
  updateBooking,
  getBookingById,
  deleteBooking
} = require('../controllers/bookingController');

const router = express.Router();

// methods for handling bookings.

router.get("/", getAllBookings);

router.post("/", createBooking);

router.get("/:bookingId", getBookingById);

router.patch("/:bookingId", updateBooking);

router.put("/:bookingId", updateBooking);

router.delete("/:bookingId", deleteBooking);

module.exports = router;
