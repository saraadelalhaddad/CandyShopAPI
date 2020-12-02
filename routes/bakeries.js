const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const path = require("path");

const {
  candyCreate,
  bakeryCreate,
  bakeryList,
  bakeryUpdate,
  bakeryDelete,
  fetchBakery,
} = require("../controllers/bakeriesController");

// Candy Create
router.post("/:bakeryId/candies", upload.single("image"), candyCreate);

// Bakery Create
router.post("/", upload.single("image"), bakeryCreate);

// Bakery List
router.get("/", bakeryList);

// // Bakery Update
// router.put("/:bakeryId", upload.single("image"), bakeryUpdate);

// // Bakery Delete
// router.delete("/:bakeryId", bakeryDelete);

module.exports = router;

// router.param("bakeryId", async (req, res, next, bakeryId) => {
//   const bakery = await fetchBakery(bakeryId, next);
//   if (bakery) {
//     req.bakery = bakery;
//     next();
//   } else {
//     const err = new Error("Bakery Not Found");
//     err.status = 404;
//     next(err);
//   }
// });
