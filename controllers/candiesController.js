let candies = require("../candies");
const slugify = require("slugify");
const Candy = require("../db/models/Candy");

exports.fetchCandy = async (candyId, next) => {
  try {
    const candy = await Candy.findByPK(candyId);
    return candy;
  } catch (error) {
    next(error);
  }
};

exports.candyCreate = (req, res, next) => {
  try {
    const id = candies[candies.length - 1].id + 1;
    const slug = slugify(req.body.name, { lower: true });
    const newCandy = { id, slug, ...req.body }; // id, slug are equivalent to id: id, slug: slug
    candies.push(newCandy);
    res.status(201).json(newCandy);
  } catch (error) {
    next(error);
  }
};

exports.candyList = (req, res) => {
  try {
    res.json(candies);
  } catch (error) {
    next(error);
  }
};

exports.candyUpdate = async (req, res, next) => {
  try {
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
