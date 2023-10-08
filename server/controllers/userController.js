const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const { role } = req.body;

    if (role !== "admin" && role !== "teacher") {
      return res.status(403).json({ message: "Invalid role." });
    }
  } catch (error) {
    console.log(error);
  }
};
