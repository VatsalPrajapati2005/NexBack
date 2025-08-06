
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const { linkBankAccount, linkUpiId, withdrawAmount,} = require("../controller/walletController");

// router.post("/link-bank", verifyToken, linkBankAccount);
// router.post("/link-upi", verifyToken, linkUpiId);
router.post("/withdraw", verifyToken, withdrawAmount);

module.exports = router;
