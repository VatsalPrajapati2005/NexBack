const AccountDetail = require("../model/accountDetailsModel");

exports.linkBankAccount = async (req, res) => {
  try {
    const { accountNumber, ifscCode, accountHolderName } = req.body;
    const userId = req.user.id

    const updated = await AccountDetail.findOneAndUpdate(
      { userId },
      {
        userId,
        bankAccount: { accountNumber, ifscCode, accountHolderName },
      },
      { upsert: true, new: true }
    );

    console.log("Result from DB:", updated);

    if (!updated) {
  console.log("❌ Document not inserted or updated!");
}

    res.status(200).json({ success: true, message: "Bank account linked", data: updated });
  } catch (err) {
    console.error("Error linking bank account:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.linkUpiId = async (req, res) => {
  try {
    const { upiId } = req.body;
    const userId = req.user.id;

    const updated = await AccountDetail.findOneAndUpdate(
      { userId },
      {
        userId,
        upi: { upiId },
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, message: "UPI ID linked", data: updated });
  } catch (err) {
    console.error("Error linking UPI:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}