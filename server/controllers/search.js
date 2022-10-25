const Company = require("../models/Company");

const search = async (req, res, next) => {
  const { search } = req.query;

  const result = await Company.aggregate([
    {
      $lookup: {
        from: "adverts",
        localField: "_id",
        foreignField: "company",
        as: "adverts",
      },
    },
    // comment out this line if you want to show companies with no ads
    { $unwind: "$adverts" },
    // {
    // uncomment this If you want to show companies with no ads
    //   $unwind: {
    //     path: "$adverts",
    //     preserveNullAndEmptyArrays: true,
    //   },
    // },
    {
      $match: {
        $or: [
          {
            name: { $regex: search, $options: "i" },
          },
          {
            "adverts.primaryText": { $regex: search, $options: "i" },
          },
          {
            "adverts.headline": { $regex: search, $options: "i" },
          },
          {
            "adverts.description": { $regex: search, $options: "i" },
          },
        ],
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        advert: "$adverts",
      },
    },
  ]);
  return res.status(200).json(result);
};

module.exports = { search };
