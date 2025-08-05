const express = require("express");
const router = express.Router();
const multer = require("../middleware/multerConfig");
const verifyToken = require("../middleware/auth"); 
const { uploadVideoReview } = require("../controller/videoReviewController"); 

router.post("/upload-video", verifyToken, multer.single("video"), uploadVideoReview);

module.exports = router;
