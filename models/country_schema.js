const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema(
  {
    country_name: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    procedures: {
      type: String,
      required: true,
    },
    requirements: {
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
const Country = mongoose.model("country", countrySchema);

module.exports = { Country };
