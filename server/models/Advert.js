const mongoose = require("mongoose");

const { companySchema } = require("./Company");

const advertSchema = new mongoose.Schema(
  {
    primaryText: {
      type: String,
      required: true,
    },
    headline: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    cta: {
      type: String,
    },
    imageURL: {
      type: String,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Advert = mongoose.model("Advert", advertSchema);

module.exports = Advert;
