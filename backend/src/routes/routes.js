const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");

router.post("/", async (req, res) => {
  try {
    const { customerName, phoneNumber, rating, feedbackText } = req.body;

    if (!customerName || !phoneNumber || !rating || !feedbackText) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const feedback = await Feedback.create({
      customerName,
      phoneNumber,
      rating,
      feedbackText,
    });

    res.status(201).json(feedback);
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ message: "Failed to submit feedback", error: error.message });
  }
});


router.get("/stats", async (req, res) => {
  try {
    const totalFeedback = await Feedback.count();
    const averageRating = await Feedback.findAll({
      attributes: [[Feedback.sequelize.fn("AVG", Feedback.sequelize.col("rating")), "avgRating"]],
      raw: true,
    });

    const countByRating = await Feedback.findAll({
      attributes: ["rating", [Feedback.sequelize.fn("COUNT", "*"), "count"]],
      group: ["rating"],
      raw: true,
    });

    const ratingCounts = {};
    countByRating.forEach((item) => {
      ratingCounts[item.rating] = item.count;
    });

    res.json({
      totalFeedback,
      averageRating: parseFloat(averageRating[0].avgRating) || 0,
      countByRating: ratingCounts,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({ order: [["createdAt", "DESC"]] });
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Failed to fetch feedback", error: error.message });
  }
});

module.exports = router;
