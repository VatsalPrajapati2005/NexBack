const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String
    },
    otpExpiresAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const userModel = mongoose.model("User", userSchema);
module.exports = { userModel };
