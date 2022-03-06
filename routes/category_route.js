const express = require("express");
const { Category } = require("../models/category_schema");
const router = express.Router();

router.post("/add", (req, res) => {
  const { name } = req.body;
  const admin = req.admin;
  const addcategory = new Category({
    name: name,
    posted_by: admin,
  });
  addcategory
    .save()
    .then(() => {
      res
        .status(200)
        .json({ message: "category has been added successfully." });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/", (req, res) => {
  Category.find()
    .then((categories) => {
      res.status(200).json({ categories });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/delete/:id", (req, res) => {
  const { id } = req.params;
  Category.findByIdAndDelete({ _id: id })
    .then(() => {
      res
        .status(200)
        .json({ message: "category has been deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  Category.findById({ _id: id })
    .then((category) => {
      res.status(200).json({ category });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/edit/:id", (req, res) => {
  const { id } = req.params;
  const query = {
    _id: id,
  };

  const newvalue = {
    $set: {
      name: req.body.name,
      posted_by: req.admin,
    },
  };
  Category.findByIdAndUpdate(query, newvalue, { new: true })
    .then(() => {
      res
        .status(200)
        .json({ message: "category has been updated successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
