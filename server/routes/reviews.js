const express = require("express");
const reviewsModel = require("../models/reviewsModel");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send({ msg: 123 });
});
router.get("/all", (req, res) => {
  reviewsModel
    .find({})
    .populate({
      path: "user",
      select: ["_id", "name"],
    })
    .populate({
      path: "party",
      select: ["_id", "name"],
    })
    .then((parties) => {
      res.send(parties);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
