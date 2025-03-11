const express = require("express");
const connectDB = require("./config/db");
const User = require("./models/user");
const signupValidater = require("./utils/signupValidater");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
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

app.post("/signin", async (req, res) => {
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
    res.send("Login Successful");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.emailId });
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.delete("/user", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.userId);
    res.send("User Deleted Succesfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.patch("/user", async (req, res) => {
  try {
    const data = req.body;
    await User.findByIdAndUpdate(req.body.userId, data);
    res.send("User Updated Succesfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("DataBase Connected...");
    app.listen(3000, () => {
      console.log("server started at 3000 port....");
    });
  })
  .catch((err) => {
    console.log("DB Not Connected " + err);
  });
