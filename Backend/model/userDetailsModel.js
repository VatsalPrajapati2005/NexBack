// const mongoose = require("mongoose");

// const userDetailsSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   postalCode: { type: String, required: true },
//   area: { type: String, required: true },
//   age: { type: Number, required: true },
//   profession: { type: String, required: true },
//   gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
// }, { timestamps: true });

// module.exports = mongoose.model("UserDetail", userDetailsSchema);
const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Yeh line zaruri hai
  fullName: { type: String, required: true },
  postalCode: { type: String, required: true },
  area: { type: String, required: true },
  age: { type: Number, required: true },
  profession: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
}, { timestamps: true });

module.exports = mongoose.model("UserDetail", userDetailsSchema);
