const { Candy } = require("../db/models");

exports.fetchCandy = async (candyId, next) => {
  try {
    const candy = await Candy.findByPK(candyId);
    return candy;
  } catch (error) {
    next(error);
  }
};

exports.candyCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newCandy = await Candy.create(req.body);
    res.status(201).json(newCandy);
  } catch (error) {
    next(error);
  }
};

exports.candyList = async (req, res, next) => {
  try {
    const candies = await Candy.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
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
  } catch (err) {
    next(error);
  }
};

exports.candyDelete = async (req, res, next) => {
  try {
    await req.candy.destroy();
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};
