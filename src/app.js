const expess = require("express");
const { adminAuth, userAuth } = require("./middleware/adminAuth");
const app = expess();

app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res) => {
  res.send("user get data");
});

app.get("/user/login", (req, res) => {
  res.send("user Login ");
});

app.get("/admin/getdata", (req, res) => {
  res.send("send all data...");
});

app.get("/admin/deletedata", (req, res) => {
  res.send("Deleted all data...");
});

app.listen(3000, () => {
  console.log("server started at 3000 port....");
});
