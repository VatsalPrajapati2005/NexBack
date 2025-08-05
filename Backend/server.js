const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes"); 
const videoRoutes=require("./routes/videoRoutes")
const userDetailsRoutes = require("./routes/userDetailsRoute");



const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));



mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log("MongoDB connected 👍"))
  .catch((err) => console.log("MongoDB error:", err));

// Routes
app.use("/api", userRoutes);
app.use("/api/feedback", feedbackRoutes); 
app.use("/api/video", videoRoutes); 
app.use("/api/user-details", userDetailsRoutes);


const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
