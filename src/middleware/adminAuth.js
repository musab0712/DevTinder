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

const userAuth = (req, res, next) => {
  console.log("In User middll");
  const token = "abc";
  const isAuth = token === "abc";
  if (isAuth) {
    next();
  } else {
    res.status(401).send("Unauthorised User");
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
