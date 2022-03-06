const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    posted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("blog", BlogSchema);

module.exports = { Blog };
