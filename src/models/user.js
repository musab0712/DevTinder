const mongoose = require("mongoose");
const validater = require("validator");

const userSchema = new mongoose.Schema(
  {
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
      validate(value) {
        if (value < 18) {
          throw new Error("Age must be a 18+");
        }
      },
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "No Information Available",
      maxLength: 500,
    },
    skills: {
      type: [String],
    },
    imgURL: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      validate(value) {
        if (!validater.isURL(value)) {
          throw new Error("Please provide a valid URL: " + value);
        }
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
