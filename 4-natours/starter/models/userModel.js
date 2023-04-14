const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'A user must have a name!'],
    minlength: [8, 'A username must have at least 8 letters!'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'A user account must have an email address!'],
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email address!'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'A user account must have a password!'],
    minlength: [8, 'A password must have at least 8 letters!'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
