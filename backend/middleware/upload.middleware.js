import multer from "multer";
import path from "path";
import fs from "fs";

// uploads/ folder exist nahi kare toh create karo
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Sirf audio files allow karo
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    "audio/mpeg",       // .mp3
    "audio/mp4",        // .m4a
    "audio/wav",        // .wav
    "audio/wave",
    "audio/x-wav",
    "audio/webm",       // .webm
    "audio/ogg",        // .ogg
    "video/webm",       // browser recording
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only audio files allowed (mp3, wav, m4a, webm, ogg)"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max
  },
});