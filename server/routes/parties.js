const express = require("express");
const partiesModel = require("../models/partiesModel");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send({ msg: 123 });
});

router.get("/all", (req, res) => {
  partiesModel.find({}, function (err, parties) {
    if (!err) {
      res.send(parties);
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
