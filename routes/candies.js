const express = require("express");
const router = express.Router();
const {
  candyCreate,
  candyList,
  candyUpdate,
  candyDelete,
} = require("../controllers/candiesController");
const slugify = require("slugify");

// Candy Create
router.post("/", candyCreate);

// Candy List
router.get("/", candyList);

// Candy Update
router.put("/:candyId", candyUpdate);

// Candy Delete
router.delete("/:candyId", candyDelete);

module.exports = router;
