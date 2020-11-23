/*** Setup ***/
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
let candies = require("./candies");
const slugify = require("slugify");

const app = express();
app.use(cors());
app.use(bodyParser.json());

/*** Code ***/
app.get("/candies", (req, res) => {
  res.json(candies);
});

app.delete("/candies/:candyId", (req, res) => {
  const { candyId } = req.params;
  const foundCandy = candies.find((candy) => candy.id === +candyId);
  if (foundCandy) {
    candies = candies.filter((candy) => candy !== foundCandy);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Candy not found" });
  }
});

app.post("/candies", (req, res) => {
  const id = candies[candies.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newCandy = { id, slug, ...req.body }; // id, slug are equivalent to id: id, slug: slug
  candies.push(newCandy);
  res.status(201).json(newCandy);
});

app.put("/candies/:candyId", (req, res) => {
  const { candyId } = req.params;
  const foundCandy = candies.find((candy) => candy.id === +candyId);
  if (foundCandy) {
    for (const key in req.body) foundCandy[key] = req.body[key];
    foundCandy.slug = slugify(req.body.name, { lower: true });
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Candy not found" });
  }
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
