const signupValidater = (req) => {
  const { firstName, emailId, password } = req.body;
  if (!firstName || !emailId || !password) {
    throw new Error("All Data are required are required");
  }
  if (password.length < 8) {
    throw new Error("Password must be atleast 8 characters long");
  }
};

module.exports = signupValidater;
