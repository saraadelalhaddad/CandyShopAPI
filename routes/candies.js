const express = require("express");
const router = express.Router();
const {
  candyCreate,
  candyList,
  candyUpdate,
  candyDelete,
  fetchCandy,
} = require("../controllers/candiesController");
const slugify = require("slugify");

router.param("candyId", async (req, res, next, candyId) => {
  const candy = await fetchCandy(candyId, next);
  if (candy) {
    req.candy = candy;
    next();
  } else {
    const err = new Error("Candy Not Found");
    err.status = 404;
    next(err);
  }
});

// Candy Create
router.post("/", candyCreate);

// Candy List
router.get("/", candyList);

// Candy Update
router.put("/:candyId", candyUpdate);

// Candy Delete
router.delete("/:candyId", candyDelete);

module.exports = router;
