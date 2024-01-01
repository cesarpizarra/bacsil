const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
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
    res.status(201).json({ message: "Registered Successfully!" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessages = Object.values(error.errors).map(
        (err) => err.message
      );
      console.log("Validation Error: ", errorMessages);

      return res.status(400).json({ message: errorMessages.join(", ") });
    }

    console.error("Error ", error.message);
    res.status(500).json({ message: "Error Registering" });
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
      return res.status(404).json({ message: "Acccount doesn't exist." });
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
    // Return additional user information in the response
    const { firstName, middleName, lastName } = user;
    res.status(200).json({
      message: "Logged in successfully",
      token,
      firstName,
      middleName,
      lastName,
    });
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

exports.info = async (req, res) => {
  try {
    const { userId } = req.params;

    // Retrieve user information based on the provided user ID
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract user's first name, middle name, and last name
    const { firstName, middleName, lastName } = user;

    // Send the user's information as a JSON response
    res.status(200).json({ firstName, middleName, lastName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// for updating the password
exports.updatePassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    // Find the user by their unique identifier (e.g., username or email)
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the current password is correct
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await User.findByIdAndUpdate(user._id, {
      password: hashedNewPassword,
    });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Password update failed" });
  }
};
