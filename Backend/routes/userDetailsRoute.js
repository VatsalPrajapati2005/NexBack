
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const UserDetail = require("../model/userDetailsModel");

// POST: submit user details
const { submitUserDetails } = require("../controller/userDetailsController");
router.post("/submit-details",verifyToken, submitUserDetails);

//  GET profile info by userId
router.get("/get-profile-info", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await UserDetail.findOne({ userId });

    if (!userDetails) {
      return res.status(404).json({ success: false, message: "User details not found" });
    }

    res.json({
      success: true,
      details: {
        fullName: userDetails.fullName,
        profession: userDetails.profession,
      }
    });
  } catch (err) {
    console.error("Error fetching profile info:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
