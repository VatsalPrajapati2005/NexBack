const VideoReview = require("../model/videoReviewModel");
const path = require("path");
const fs = require("fs");

const uploadVideoReview = async (req, res) => {
    
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No video uploaded" });
    }

    const videoUrl = `/uploads/videos/${req.file.filename}`;

    const review = new VideoReview({
      userId: req.user.id,
      videoUrl,
    });
    
    await review.save();
    res.status(201).json({ success: true, message: "Video uploaded successfully", review });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}; 

module.exports = { uploadVideoReview };
