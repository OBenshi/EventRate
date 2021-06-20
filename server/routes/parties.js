const express = require("express");
const partiesModel = require("../models/partiesModel");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send({ msg: 123 });
});

// router.get("/all", (req, res) => {
//   partiesModel
//     .find({})
//     .populate({
//       path: "reviews",
//       // select: ["text"],
//     })
//     .then((parties) => {
//       res.send(parties);
//     })
//     .catch((err) => res.send(err));
// });
router.get("/all", (req, res) => {
  partiesModel
    .find({})
    // .then(() =>
    //   subPopulate(
    //     "reviews"
    //     // select: ["_id"],
    //   )
    // )
    // .then((thing) => {
    // console.log("??????????????????????????", thing);
    // .populate(
    //   { path: "reviews" }
    //   // select: ["text"],}
    // )
    .populate("reviews")
    // .then((thing) => {
    // console.log(thing);
    // thing;
    // array.forEach(element => {

    // });
    // thing.populate({ path: "reviewsuser", select: ["text"] });
    // })
    // .then(forEach(review in thing.reviews){}})
    // console.log("!!!!!!!!!ßßßßßßßßßßßßßßßßßäääääääää!!!!!!!!!!!!");
    .then((parties) => {
      res.send(parties);
    })
    .catch((err) => res.send(err));
});

router.get("/:partyName", (req, res) => {
  partiesModel.find({ name: req.params.partyName }, function (err, parties) {
    if (!err) {
      res.send(parties);
    } else {
      res.send(err);
    }
  });
});

module.exports = router;
