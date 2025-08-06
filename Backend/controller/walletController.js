const Wallet = require("../model/walletModel");

// Withdraw request (with ₹100 min check)
exports.withdrawAmount = async (req, res) => {
  try {
    const { amount, method } = req.body;
    const userId = req.user.id;

    // Check minimum withdrawal
    if (amount < 100) {
      return res.status(400).json({ success: false, message: "Minimum withdrawal amount is ₹100" });
    }

    const wallet = await Wallet.findOne({ userId });

    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ success: false, message: "Insufficient balance" });
    }

    if (method === "bank" && !wallet.linkedBank?.accountNumber) {
      return res.status(400).json({ success: false, message: "Bank account not linked" });
    }

    if (method === "upi" && !wallet.linkedUPI?.upiId) {
      return res.status(400).json({ success: false, message: "UPI not linked" });
    }

    // Withdraw
    wallet.balance -= amount;
    await wallet.save();

    res.json({ success: true, message: `₹${amount} withdrawal requested via ${method}` });
  } catch (err) {
    console.error("Withdraw error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
