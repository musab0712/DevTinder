const express = require("express");
const connectDB = require("./config/db");
const User = require("./models/user");
const signupValidater = require("./utils/signupValidater");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");

const app = express();

const authRouter = require("./routes/authRouter");

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);

app.get("/profile", userAuth, (req, res) => {
  try {
    const user = req.user;
    res.send(user);
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
