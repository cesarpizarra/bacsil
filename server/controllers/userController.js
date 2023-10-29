const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      $and: [{ userId: req.body.userId }, { username: req.body.username }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "Account already exists." });
    }

    const { role } = req.body;

    if (role !== "teacher" && role !== "student") {
      return res.status(403).json({ message: "Invalid role." });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      userId: req.body.userId,
      username: req.body.username,
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      password: hashedPassword,
      role: req.body.role,
    });
    await user.save();
    res.status(201).json({ message: "User Registered Successfully!" });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  const { userId, password, role } = req.body;

  try {
    let user;

    if (userId) {
      user = await User.findOne({ userId });
    }

    if (!user) {
      return res.status(404).json({ message: "Login Failed" });
    }

    // Check if the selected role matches the user's role
    if (user.role !== role) {
      return res.status(401).json({ message: "Invalid role" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.users = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
