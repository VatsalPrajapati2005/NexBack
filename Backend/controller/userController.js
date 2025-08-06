const jwt = require("jsonwebtoken");
const { userModel } = require("../model/userModel");
const { generateOTP } = require("../utils/otpGenerator");

exports.register = async (req, res) => {
    const { mobile } = req.body;

    if (!mobile) {
        return res.status(400).json({ success: false, message: "Mobile number is required" });
    }

    const otp = generateOTP();
    const otpExpiresAt = Date.now() + 5 * 60 * 1000;

    try {
        await userModel.findOneAndUpdate(
            { mobile },
            { otp, otpExpiresAt },
            { upsert: true, new: true }
        );
          console.log(`OTP for ${mobile} is: ${otp}`);

        return res.status(200).json({
            success: true,
            message: "OTP generated successfully."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Registration failed",
            error: error.message
        });
    }
};

exports.verifyOTP = async (req, res) => {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
        return res.status(400).json({ success: false, message: "Mobile and OTP are required" });
    }
    
    const user = await userModel.findOne({ mobile });

    if (!user || user.otp !== otp) {
        return res.status(401).json({ success: false, message: "Invalid OTP" });
    }
    if (Date.now() > user.otpExpiresAt) {
        return res.status(401).json({ success: false, message: "OTP expired" });
    }

    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    const payload = { id: user._id, mobile: user.mobile };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7h" });

    return res.status(200).json({
        success: true,
        message: "OTP verified. Login successful.",
        token
    });
};
