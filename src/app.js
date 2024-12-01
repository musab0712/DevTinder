const expess = require("express");

const app = expess();

app.use(
  "/user",
  (req, res, next) => {
    console.log("user 1");
    //res.send("res 1");
    next();
  },
  (req, res, next) => {
    console.log("user 2");
    res.send("res 2");
    //next();
  }
);

app.listen(3000, () => {
  console.log("server started at 3000 port....");
});
