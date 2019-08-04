/* eslint-disable func-names */
/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcrypt");
const {
  DEFAULT_VALUES
} = require('../constants/constants');

//  schema for user
const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String, lowercase: true, required: [true, "can't be blank"]
  },
  username: {
    type: String, lowercase: true, unique: true, required: [true, "can't be blank"]
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

// pre function for hashing the password
UserSchema.pre('save', async function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  // hash the password using our new salt
  try {
    const salt = await bcrypt.genSalt(DEFAULT_VALUES.BCRYPT_ROUNDS);
    // override the cleartext password with the hashed one
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// mongoose method for comparing password
UserSchema.methods.comparePassword = async function (password, cb) {
  // Hashes the password sent by the user for login and checks if the hashed password stored in the database
  // matches the one sent. Returns true if it does else false.
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    cb(null, isMatch);
  } catch (error) {
    cb(error);
  }
};

module.exports = mongoose.model('User', UserSchema);
