const mongoose = require("mongoose");
const SliderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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

const Slider = mongoose.model("slider", SliderSchema);

module.exports = { Slider };
