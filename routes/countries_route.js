const express = require("express");
const { country_upload } = require("../middlewares/country_file_helper");
const router = express.Router();
const { Country } = require("../models/country_schema");

router.post("/add", country_upload.single("image"), (req, res) => {
  const admin = req.admin;
  const newcountry = new Country({
    country_name: req.body.country_name,
    overview: req.body.overview,
    procedures: req.body.procedures,
    requirements: req.body.requirement,
    posted_by: admin,
    image: req.file.filename,
  });
  newcountry
    .save()
    .then(() => {
      res.status(200).json({ message: "country has been added successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/", (req, res) => {
  Country.find()
    .then((countries) => {
      res.status(200).json({ countries: countries });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Country.findById({ _id: id })
    .then((country) => {
      res.status(200).json({ country: country });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
