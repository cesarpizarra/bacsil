const express = require("express");
const router = express.Router();
const File = require("../models/upload");

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

module.exports = router;
