const express = require("express");
const usersModel = require("../models/usersModel");
// const subReferencesPopulate = require("mongoose-sub-references-populate");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send({ msg: process.env.MY_TRY });
});

// router.get("/all", (req, res) => {
//   usersModel.find({}, function (err, users) {
//     if (!err) {
//       res.send(users);
//     } else {
//       res.send(err);
//     }
//   });
// });
router.get("/all", (req, res) => {
  usersModel
    .find({})
    .populate({
      path: "reviews",
      select: ["text"],
    })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
