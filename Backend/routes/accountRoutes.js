const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const { linkBankAccount, linkUpiId } = require("../controller/accountController");

router.post("/link-bank", verifyToken, linkBankAccount);
router.post("/link-upi", verifyToken, linkUpiId);

module.exports = router;
