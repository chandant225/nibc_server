const express = require("express");
const router = express.Router();

router.post("/add-course", (req, res) => {
  const admin = req.admin;

  const addcourse = new Course({
    title: req.body.title,
    description: req.body.description,
    image: req.file.filename,
  });

  addcourse
    .save()
    .then(() => {
      res.status(200).json({ message: "course has been added successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/", (req, res) => {
  Course.find()
    .populate("posted_by", "name")
    .then((courses) => {
      res.status(200).json({ courses });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/edit-course/:id", (req, res) => {
  const { id } = req.params;
  Course.findById({ _id: id })
    .populate("posted_by", "name")
    .then((isfound) => {
      res.status(200).json({ course });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/edit-course/:id", (req, res) => {
  const { id } = req.params;
  const admin = req.admin;
  const query = { _id: id };
  const newvalue = {
    $set: {
      title: req.body.title,
      description: req.body.description,
      image: req.file.filename,
      posted_by: admin,
    },
  };
  Course.updateOne(query, newvalue, { new: true })
    .then(() => {
      res.status(200).json({ message: "course has been updated successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/delete-course/:id", (req, res) => {
  const { id } = req.params;
  Course.findByIdAndDelete({ _id: id })
    .then(() => {
      res.status(200).json({ message: "course has been deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
