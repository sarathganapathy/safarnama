const mongoose = require('mongoose');

// schema for blog
const blogSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  details: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }
});

module.exports = mongoose.model('Blog', blogSchema);
