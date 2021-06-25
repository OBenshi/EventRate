const express = require("express");
const partiesModel = require("../models/partiesModel");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send({ msg: 123 });
});

router.get("/all", (req, res) => {
  partiesModel
    .find({})
    .then((parties) => {
      res.send(parties);
    })
    .catch((err) => res.send(err));
});

router.get("/:partyName", (req, res) => {
  partiesModel
    .find({ name: req.params.partyName })
    .populate({ path: "reviews", populate: { path: "user", select: ["name"] } })
    .then((parties) => {
      res.send(parties);
    })
    .catch((err) => res.send(err));
});
module.exports = router;
