const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
  },
  answers: {
    type: [Number],
    validate: {
      validator: function (val) {
        return Array.isArray(val) && val.length === 10;
      },
      message: "Exactly 10 answers are required.",
    },
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Feedback", feedbackSchema);

