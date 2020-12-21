const { Candy, Bakery } = require("../db/models");

exports.fetchCandy = async (candyId, next) => {
  try {
    const candy = await Candy.findByPk(candyId);
    return candy;
  } catch (error) {
    next(error);
  }
};

exports.candyList = async (req, res, next) => {
  try {
    const candies = await Candy.findAll({
      attributes: { exclude: ["bakeryId", "createdAt", "updatedAt"] },
      include: {
        model: Bakery,
        as: "bakery",
        attributes: ["name", "slug"],
      },
    });
    res.json(candies);
  } catch (error) {
    next(error);
  }
};

exports.candyUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.candy.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.candyDelete = async (req, res, next) => {
  try {
    await req.candy.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
