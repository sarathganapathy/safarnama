const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  details: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  selectedStars: { type: Number, default: 0 }
});

module.exports = mongoose.model('Review', reviewSchema);
