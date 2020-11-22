const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

let candies = require("./candies");

/*** ***/
app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
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

app.get("/candies", (req, res) => {
  res.json(candies);
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
