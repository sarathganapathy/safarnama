const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//  schema for user
const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String, lowercase: true, required: [true, "can't be blank"]
  },
  phone: {
    type: Number, unique: true, required: [true, "can't be blank"], match: [/^\d{12}$/, 'is invalid']
  },
  email: {
    type: String, unique: true, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  userType: { type: String, required: true },
  dob: { type: Date },
  password: { type: String, required: true }
});

UserSchema.plugin(uniqueValidator, { message: 'already exists.' });

module.exports = mongoose.model('User', UserSchema);
