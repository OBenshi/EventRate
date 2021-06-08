const express = require("express");
const usersModel = require("../models/usersModel");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send({ msg: 123 });
});

router.get("/all", (req, res) => {
  usersModel.find({}, function (err, users) {
    if (!err) {
      res.send(users);
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
