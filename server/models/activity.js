const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  name: String,
  url: String,
  subject: String,
});
module.exports = mongoose.model("Activity", activitySchema);
