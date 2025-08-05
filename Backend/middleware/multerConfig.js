const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/videos");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === ".mp4" || ext === ".mov" || ext === ".webm" || ext === ".avi") {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed"), false);
  }
};

module.exports = multer({ storage, fileFilter });
