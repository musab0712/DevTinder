const expess = require("express");
const connectDB = require("./config/db");
const User = require("./models/user");
const app = expess();

app.post("/getData", async (req, res) => {
  const user = new User({
    firstName: "Musab",
    lastName: "Hassan",
    emailId: "musab@gmail.com",
    password: "musab@123",
  });

  await user.save();
  res.send("Data Sava Successful");
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
