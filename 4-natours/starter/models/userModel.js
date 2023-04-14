const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    select: false, // will be returned to user
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      validator: function (pwdC) {
        // only works on CREATE and SAVE. NOT UPDATE
        return pwdC === this.password;
      },
      message: 'Passwords are not the same! ',
    },
  },
});

userSchema.pre('save', async function (next) {
  // Only run if password was modified
  if (!this.isModified('password')) return next();

  // Hash/encrypt the password with a cost of 14
  this.password = await bcrypt.hash(this.password, 14);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// Instance method
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  // this.password not available because of select: false, hence we have to pass in userPassword
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
