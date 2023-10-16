const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const fileController = require("../controllers/uploadFileController");

router.post("/file", upload.single("file"), fileController.uploadFile);

module.exports = router;
