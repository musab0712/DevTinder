const mongoose = require("mongoose");
const validater = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 40,
  },
  lastName: {
    type: String,
    minLength: 3,
    maxLength: 40,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validater.isEmail(value)) {
        throw new Error("Email is not Valid: " + value);
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validater.isStrongPassword(value)) {
        throw new Error("Please Enter a strong pswd: " + value);
      }
    },
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
