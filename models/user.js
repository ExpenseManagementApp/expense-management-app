const mongoose = require('mongoose');

const DBUser = mongoose.model(
  'User',
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      min: 6
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 255,
      min: 6
    },
    password: {
      type: String,
      required: true,
      min: 6
    },
    salt: {
      type: String,
      required: true
    },
    resetPasswordToken: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    avatar: {
      type: Buffer,
      default: null
    }
  }, {
    timestamps: true
  })
);

module.exports = DBUser;