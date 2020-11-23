let candies = require("../candies");
const slugify = require("slugify");

exports.candyCreate = (req, res) => {
  const id = candies[candies.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newCandy = { id, slug, ...req.body }; // id, slug are equivalent to id: id, slug: slug
  candies.push(newCandy);
  res.status(201).json(newCandy);
};

exports.candyList = (req, res) => res.json(candies);

exports.candyUpdate = (req, res) => {
  const { candyId } = req.params;
  const foundCandy = candies.find((candy) => candy.id === +candyId);
  if (foundCandy) {
    for (const key in req.body) foundCandy[key] = req.body[key];
    foundCandy.slug = slugify(req.body.name, { lower: true });
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Candy not found" });
  }
};

exports.candyDelete = (req, res) => {
  const { candyId } = req.params;
  const foundCandy = candies.find((candy) => candy.id === +candyId);
  if (foundCandy) {
    candies = candies.filter((candy) => candy !== foundCandy);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Candy not found" });
  }
};
