const express = require("express");
const router = express.Router();
const { Slider } = require("../models/slider_schema");
const { slider_upload } = require("../middlewares/slider_file_helper");
const { authenticate } = require("../middlewares/verifytoken");

router.post("/add", authenticate, slider_upload.single("image"), (req, res) => {
  const admin = req.admin;
  const newslider = new Slider({
    title: req.body.title,
    description: req.body.description,
    image: req.file.filename,
    posted_by: admin,
  });
  newslider
    .save()
    .then(() => {
      res
        .status(200)
        .json({ message: "slider image has been saved successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/", (req, res) => {
  Slider.find()
    .then((sliders) => {
      res.status(200).json({ sliders });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/delete/:id", (req, res) => {
  const { id } = req.params;
  Slider.findByIdAndDelete({ _id: id })
    .then(() => {
      res.status(200).json({ message: "slider has been deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Slider.findById({ _id: id })
    .then((slider) => {
      res.status(200).json({ slider });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post(
  "/edit/:id",
  authenticate,
  slider_upload.single("image"),
  (req, res) => {
    const { id } = req.params;
    const admin = req.adm;
    const query = { _id: id };
    const newvalue = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        image: req.file.filename,
        posted_by: admin,
      },
    };
    Slider.updateOne(query, newvalue, { new: true })
      .then(() => {
        res
          .status(200)
          .json({ message: "slider has been updated successfully" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

module.exports = router;
