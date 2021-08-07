const multer = require("multer");
const path = require("path");

const tempDir = path.join(process.cwd(), "tmp");

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2000,
  },
});

const uploadPictures = multer({
  storage: storageConfig,
});

module.exports = uploadPictures;
