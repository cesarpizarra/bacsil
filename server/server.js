const express = require("express");
const colors = require("colors");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "Mongodb connection error")
);

mongoose.connection.once("open", () => {
  console.log("Connected to mongodb".underline.yellow);
});

// Middlewares
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false, limit: "20mb" }));
app.use(cors());

// Routes
const userRoute = require("./routes/userRoutes");
const uploadRoute = require("./routes/uploadFileRoute");
const fileRoute = require("./routes/fileRoutes");

app.use("/bacsil", userRoute);
app.use("/upload", uploadRoute);
app.use("/files", fileRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`.underline.magenta);
});
