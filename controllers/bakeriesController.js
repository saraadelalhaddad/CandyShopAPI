const { Bakery, Candy } = require("../db/models");

exports.fetchBakery = async (bakeryId, next) => {
  try {
    const bakery = await Bakery.findByPK(bakeryId);
    return bakery;
  } catch (error) {
    next(error);
  }
};

exports.bakeryCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newBakery = await Bakery.create(req.body);
    res.status(201).json(newBakery);
  } catch (error) {
    next(error);
  }
};

exports.bakeryList = async (req, res, next) => {
  try {
    const bakeries = await Bakery.findAll({
      attributes: ["id", "name"],
      include: {
        model: Candy,
        as: "candies",
        attributes: ["id"],
      },
    });
    res.json(bakeries);
  } catch (error) {
    next(error);
  }
};

exports.candyCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.bakeryId = req.params.bakeryId;
    const newCandy = await Candy.create(req.body);
    res.status(201).json(newCandy);
  } catch (error) {
    next(error);
  }
};

// exports.bakeryUpdate = async (req, res, next) => {
//   try {
//     if (req.file) {
//       req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
//     }
//     await req.bakery.update(req.body);
//     res.status(204).end();
//   } catch (err) {
//     next(error);
//   }
// };

// exports.bakeryDelete = async (req, res, next) => {
//   try {
//     await req.bakery.destroy();
//     res.status(204).end();
//   } catch (err) {
//     next(error);
//   }
// };
