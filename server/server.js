const express = require("express");
const colors = require("colors");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const userRoute = require("./routes/userRoutes");

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
app.use(express.json());
app.use(cors());

// Routes
app.use("/bacsil/auth", userRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`.underline.cyan);
});
