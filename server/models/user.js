const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Manually create the id
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "teacher", "student"],
  },
});

module.exports = mongoose.model("User", userSchema);
