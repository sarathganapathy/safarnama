const mongoose = require('mongoose');

const workWithUsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: {
    header: { type: String, required: true },
    content: { type: String, required: true }
  },
  phone: [{
    type: { type: String, required: true },
    number: { type: String, required: true }
  }],
  email: { type: String, required: true }
});

module.exports = mongoose.model('WorkWithUs', workWithUsSchema);
