const express = require("express");
const router = express.Router();

const { register, verifyOTP } = require("../controller/userController");
const verifyToken = require("../middleware/auth"); 

router.post("/register", register);
router.post("/verify-otp", verifyOTP);

router.get("/profile", verifyToken, (req, res) => {
  res.json({ success: true, message: "Protected route accessed", user: req.user });
});

module.exports = router;

