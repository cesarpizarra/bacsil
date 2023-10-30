const express = require("express");
const router = express.Router();
const Activity = require("../models/activity");

// Define a route for uploading activities
router.post("/upload", async (req, res) => {
  try {
    const { name, url, subject } = req.body;

    // Save the activity to the database
    const activity = new Activity({ name, url, subject });
    await activity.save();

    res.status(200).json({ message: "Activity saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading the activity.");
  }
});

// Get all activities for a specific subject
router.get("/activities/:subjectTitle", async (req, res) => {
  try {
    const subjectTitle = req.params.subjectTitle;
    const activities = await Activity.find({ subject: subjectTitle });
    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching activities for the subject.");
  }
});

module.exports = router;
