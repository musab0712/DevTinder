const express = require("express");
const signupValidater = require("../utils/signupValidater");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    signupValidater(req);
    const { firstName, lastName, emailId, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });
    console.log(user);
    await user.save();
    res.send("Data Save Successful");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(401).send("User Not Found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid Credentials");
    }
    jwt.sign({ emailId }, "devSecretKey", { expiresIn: "7d" }, (err, token) => {
      if (err) {
        return res.status(500).send("Error generating token");
      }
      console.log("Token Generated: ", token);
      res.cookie("token", token, { httpOnly: true });
      res.send("Login Successful");
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = router;
