const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  subject: String,
  name: String,
  type: String,
  data: Buffer,
});

module.exports = mongoose.model("File", fileSchema);
