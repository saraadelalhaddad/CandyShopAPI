const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});

const candies = require("./candies");
app.get("/candies", (req, res) => {
  res.json(candies);
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
