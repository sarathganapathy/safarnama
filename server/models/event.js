const mongoose = require('mongoose');

// schema for event
const eventSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  bookingURL: { type: String, required: true },
  eventName: { type: String, required: true },
  description: { type: String, required: true },
  eventLocation: { type: String, required: true },
  details: { type: String, required: true },
  currency: { type: String, required: true },
  price: { type: Number, required: true },
  eventImage: { type: String, required: true },
  eventStartDate: { type: Date },
  eventEndDate: { type: Date }
});

module.exports = mongoose.model('Event', eventSchema);
