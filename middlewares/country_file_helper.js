const multer = require("multer");

const country_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/countries");
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

const country_upload = multer({
  storage: country_storage,
  fileFilter: filefilter,
});

module.exports = {
  country_upload,
};