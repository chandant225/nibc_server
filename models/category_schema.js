const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

const Category = mongoose.model("category", CategorySchema);

module.exports = { Category };
