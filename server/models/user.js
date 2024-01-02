const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Manually create the id
  userId: {
    type: String,
    unique: true,
    required: [true, "LRN Number is required"],
    minLength: [12, "LRN must be larger than 12 numbers"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
  },
  firstName: {
    type: String,
    unique: true,
    required: [true, "First Name is required"],
  },
  middleName: {
    type: String,
    unique: true,
    required: [true, "Middle Name is required"],
  },

  lastName: {
    type: String,
    unique: true,
    required: [true, "Last Name is required"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ["teacher", "student"],
  },
});

module.exports = mongoose.model("User", userSchema);
