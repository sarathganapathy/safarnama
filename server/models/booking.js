const mongoose = require('mongoose');

const booking = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  event: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Event" },
  bookingDate: { type: Date, required: true },
  paymentOption: { type: String, required: true }
});

module.exports = mongoose.model('Booking', booking);
