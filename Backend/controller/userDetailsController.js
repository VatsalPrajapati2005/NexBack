const UserDetail = require("../model/userDetailsModel");

const submitUserDetails = async (req, res) => {

  try {
    const userId = req.user.id; 
    const { fullName, postalCode, area, age, profession, gender } = req.body;

    if (!fullName || !postalCode || !area || !age || !profession || !gender) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newUser = new UserDetail({
      userId,
      fullName,
      postalCode,
      area,
      age,
      profession,
      gender,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: "User details saved", data: newUser });
  } catch (err) {
    console.error("Error saving user details:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }

}


module.exports = { submitUserDetails };
