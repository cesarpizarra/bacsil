const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//Register Route
router.post("/register", userController.register);

// Login Route
router.post("/login", userController.login);

// Get all users Route

router.get("/users", userController.users);

// Get user info Route
router.get("/info/:userId", userController.info);

// Updar user Route
router.post("/update-password", userController.updatePassword);
router.delete("/delete/:id", userController.deleteUser);
router.put("/update/:id", userController.updateUser);

module.exports = router;
