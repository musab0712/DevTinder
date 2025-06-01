const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth = (req, res, next) => {
  console.log("In Auth middll");
  const token = "xyz";
  const isAuth = token === "xyz";
  if (isAuth) {
    next();
  } else {
    res.status(401).send("Unauthorised");
  }
};

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send("Unauthorized");
    }
    const decoded = await jwt.verify(token, "devSecretKey");
    if (!decoded) {
      return res.status(401).send("Invalid Token");
    }
    const user = await User.findOne({ emailId: decoded.emailId });
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("Unauthorised");
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
