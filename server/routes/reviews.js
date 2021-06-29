const express = require("express");
const reviewModel = require("../models/reviewsModel");
const router = express.Router();
const userModel = require("../models/usersModel");
router.get("/test", (req, res) => {
  res.send({ msg: 123 });
});
// router.get("/all", (req, res) => {
//   reviewsModel
//     .find({})
//     .populate({
//       path: "user",
//       // select: ["_id", "name"],
//     })
//     .populate({
//       path: "party",
//       // select: ["_id", "name"],
//     })
//     .then((parties) => {
//       res.send(parties);
//     })
//     .catch((err) => res.send(err));
// });

router.post("/new", (req, res) => {
  console.log(req.body);
  const reqUserId = req.body.userId;
  const reqParty = req.body.party;
  const reqDate = req.body.date;
  const reqRating = req.body.rating || 1;
  const reqText = req.body.text || "";

  // const newReview = new reviewModel();
  reviewModel
    .insert({
      user: reqUserId,
      party: reqParty,
      date: reqDate,
      rating: reqRating,
      text: reqText,
    })
    .then((review) => {
      users.update(
        { _id: `${reqUserId}` },
        { $push: { reviews: "review._id" } }
      );
      parties.update(
        { _id: `${reqParty}` },
        { $push: { reviews: "review._id" } }
      );
      res.send({ hi });
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
