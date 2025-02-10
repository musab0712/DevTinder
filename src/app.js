const express = require("express");
const connectDB = require("./config/db");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("Data Save Successful");
});

app.get("/user", async (req, res) => {
  const user = await User.findOne({ emailId: req.body.emailId });
  res.send(user);
});

app.get("/feed", async (req, res) => {
  const user = await User.find({});
  res.send(user);
});

app.delete("/user", async (req, res) => {
  await User.findByIdAndDelete(req.body.userId);
  res.send("User Deleted Succesfully");
});

app.patch("/user", async (req, res) => {
  const data = req.body;
  await User.findByIdAndUpdate(req.body.userId, data);
  res.send("User Updated Succesfully");
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
