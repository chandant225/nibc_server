const multer = require("multer");

const slider_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/sliders");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const slider_upload = multer({
  storage: slider_storage,
  fileFilter: filefilter,
});

module.exports = {
  slider_upload,
};
