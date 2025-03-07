const { validationResult } = require("express-validator");
const Feedback = require("../models/feedback");

// Submit feedback
exports.submitFeedback = async (req, res) => {
  const { customerName, phoneNumber, rating, feedbackText } = req.body;

  if (!customerName || !phoneNumber || !rating || !feedbackText) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const feedback = await Feedback.create({ customerName, phoneNumber, rating, feedbackText });
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get statistics
exports.getFeedbackStats = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll();
    const totalFeedback = feedbacks.length;
    const averageRating = feedbacks.reduce((sum, f) => sum + f.rating, 0) / totalFeedback || 0;
    const countByRating = feedbacks.reduce((acc, f) => {
      acc[f.rating] = (acc[f.rating] || 0) + 1;
      return acc;
    }, {});

    res.json({ totalFeedback, averageRating, countByRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
