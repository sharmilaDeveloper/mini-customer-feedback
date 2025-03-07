const express = require("express");
const cors = require("cors");
const feedbackRoutes = require("./routes/routes");
const sequelize = require("./config/database");
const Feedback = require("./models/feedback");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/feedback", feedbackRoutes);


sequelize.sync()
  .then(() => console.log("Database connected"))
  .catch(err => console.error("Database error:", err));

module.exports = app;
