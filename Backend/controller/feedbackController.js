const Feedback = require("../model/feedbackModel");

const submitFeedback = async (req, res) => {
  try {
    const { brand, model, serialNumber, answers } = req.body;

    if (!brand || !model || !serialNumber || !answers || answers.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "All fields are required with exactly 10 answers."
      });
    }

    const newFeedback = new Feedback({
      userId: req.user.id,
      brand,
      model,
      serialNumber,
      answers,
    });

    await newFeedback.save();

    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully.",
    });
  } catch (error) {
    console.error("Feedback error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = submitFeedback;
