const mongoose = require("mongoose");

const videoReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("VideoReview", videoReviewSchema);
