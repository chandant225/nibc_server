const { Blog } = require("../models/blog_schema");

const Blog_Index = (req, res) => {
  Blog.find()
    .populate("posted_by")
    .populate("category")
    .then((blogs) => {
      res.status(401).send({ blogs: blogs });
    })
    .catch((err) => {
      console.log(err);
    });
};

const Edit_Blog = (req, res) => {
  const { id } = req.params;
  Blog.findOne({ _id: id })
    .then((isFound) => {
      res.status(200).json({ isFound });
      console.log(isFound);
    })
    .catch((err) => {
      console.log(err);
    });
};

const Single_Blog = (req, res) => {
  const { id } = req.params;
  Blog.findOne({ _id: id })
    .populate("posted_by", "name")
    .populate("category", "name")

    .then((blog) => {
      res.status(200).json({ blog });
    })
    .catch((err) => {
      console.log(err);
    });
};

const Upload_Blog = (req, res) => {
  const admin = req.admin;

  const addblog = new Blog({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    image: req.file.filename,
    posted_by: admin,
  });
  addblog
    .save()
    .then((issaved) => {
      res.json({ message: "new blog has been posted successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const Update_blog = (req, res) => {
  const { id } = req.params;
  const admin = req.admin;

  const query = { _id: id };
  const newvalue = {
    $set: {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      image: req.file.filename,
      posted_by: admin,
    },
  };
  Blog.updateOne(query, newvalue, { new: true })
    .then(() => {
      res.status(200).json({ message: "blog has been updated successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const Delete_blog = (req, res) => {
  const { id } = req.params;

  Blog.findByIdAndDelete({ _id: id })
    .then(() => {
      res.status(200).json({ message: "blog has been deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const Get_cat_blogs = (req, res) => {
  const { id } = req.params;
  Blog.find({ category: id })
    .populate("posted_by", "name")
    .populate("category", "name")
    .then((blogs) => {
      res.status(200).json({ blogs });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  Blog_Index,
  Upload_Blog,
  Edit_Blog,
  Single_Blog,
  Update_blog,
  Delete_blog,
  Get_cat_blogs,
};
