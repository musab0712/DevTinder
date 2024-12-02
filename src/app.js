const expess = require("express");
const connectDB = require("./config/db");

const app = expess();

connectDB()
  .then(() => {
    console.log("DataBase Connected...");
  })
  .catch((err) => {
    console.log("DB Not Connected " + err);
  });

app.listen(3000, () => {
  console.log("server started at 3000 port....");
});
