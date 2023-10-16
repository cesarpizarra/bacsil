const File = require("../models/upload");

exports.uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const { originalname, mimetype, buffer } = req.file;

  const newFile = new File({
    name: originalname,
    type: mimetype,
    data: buffer,
  });

  try {
    await newFile.save();
    res.status(201).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
