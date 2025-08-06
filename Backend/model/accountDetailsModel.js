const mongoose = require("mongoose");

const accountDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  bankAccount: {
    accountNumber: String,
    ifscCode: String,
    accountHolderName: String,
  },
  upi: {
    upiId: String,
  },
}, { timestamps: true,strict: true });

module.exports = mongoose.model("AccountDetail", accountDetailsSchema);