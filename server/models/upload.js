const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: String,
  type: String,
  data: Buffer,
});

module.exports = mongoose.model("File", fileSchema);
