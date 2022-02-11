const multer = require("multer");
const path = require("path");
const fs = require("fs");

const MEDIA_PATH = path.join(__dirname, "../public/media");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (!fs.existsSync(MEDIA_PATH)) {
      fs.mkdirSync(MEDIA_PATH, { recursive: true });
    }
    cb(null, MEDIA_PATH);
  },
  filename(req, file, cb) {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

module.exports = multer({ storage });
