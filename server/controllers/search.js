const Company = require("../models/Company");
const Advert = require("../models/Advert");

const search = async (req, res, next) => {
  const { search } = req.query;

  const result = await Advert.aggregate([
    {
      $lookup: {
        from: "companies",
        localField: "company",
        foreignField: "_id",
        as: "company",
      },
    },
    { $unwind: "$company" },
    {
      $match: {
        $or: [
          {
            primaryText: { $regex: search, $options: "i" },
          },
          {
            headline: { $regex: search, $options: "i" },
          },
          {
            description: { $regex: search, $options: "i" },
          },
          {
            "company.name": { $regex: search, $options: "i" },
          },
        ],
      },
    },
    {
      $project: {
        "company.adverts": 0,
      },
    },
  ]);

  return res.status(200).json(result);
};

module.exports = { search };
