const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://musabhassan1999:WebDev@cluster0.4zg9xhx.mongodb.net/DevTinder"
  );
};

module.exports = connectDB;
