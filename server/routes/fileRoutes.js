const express = require("express");
const router = express.Router();
const File = require("../models/upload");

// Route for getting a file by filename
router.get("/:filename", async (req, res) => {
  const { filename } = req.params;

  try {
    const file = await File.findOne({ name: filename });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.setHeader("Content-Type", file.type);
    res.send(file.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// New route for getting all files of a specific subject
router.get("/subject/:subject", async (req, res) => {
  const { subject } = req.params;

  try {
    const files = await File.find({ subject });

    if (!files || files.length === 0) {
      return res
        .status(404)
        .json({ message: `No files found for subject: ${subject}` });
    }

    // Extract relevant file information and send it as JSON
    const fileData = files.map((file) => ({
      _id: file._id,
      filename: file.name,
      contentType: file.type,
    }));

    res.json(fileData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Define a route for file download
router.get("/download/:id", async (req, res) => {
  try {
    const fileId = req.params.id;

    // Find the file in the database by its unique ID
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Set the content type and attachment disposition for the response
    res.setHeader("Content-Type", file.type);
    res.setHeader("Content-Disposition", `attachment; filename=${file.id}`);

    // Send the file's data as the response body
    res.send(file.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
