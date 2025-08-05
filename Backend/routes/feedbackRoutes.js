const express = require("express");
const router = express.Router();

const submitFeedback = require("../controller/feedbackController"); 
const verifyToken = require("../middleware/auth");

router.post("/submit-feedback", verifyToken, submitFeedback); 

module.exports = router;
