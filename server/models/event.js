const mongoose = require('mongoose');

// schema for event
const eventSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  eventName: { type: String, required: true },
  description: { type: String, required: true },
  eventLocation: { type: String, required: true },
  details: { type: String, required: true },
  moreDetails: { type: String, required: true },
  currency: { type: String, required: true },
  price: { type: Number, required: true },
  eventImage1: { type: String, required: true },
  eventImage2: { type: String },
  eventImage3: { type: String },
  eventStartDate: { type: String },
  eventEndDate: { type: String }
});

module.exports = mongoose.model('Event', eventSchema);
