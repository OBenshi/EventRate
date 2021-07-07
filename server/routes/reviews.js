//==============================================================
//
//*  #####    #####  ##   ##  ##  #####  ##      ##   ####
//*  ##  ##   ##     ##   ##  ##  ##     ##      ##  ##
//*  #####    #####  ##   ##  ##  #####  ##  ##  ##   ###
//*  ##  ##   ##      ## ##   ##  ##     ##  ##  ##     ##
//*  ##   ##  #####    ###    ##  #####   ###  ###   ####
//
//*  #####     #####   ##   ##  ######  #####
//*  ##  ##   ##   ##  ##   ##    ##    ##
//*  #####    ##   ##  ##   ##    ##    #####
//*  ##  ##   ##   ##  ##   ##    ##    ##
//*  ##   ##   #####    #####     ##    #####
//
//==============================================================

/* -------------------------------------------------------------------------- */
//*       ======================================================              //
//        =============== SECTION IMPORTS ======================              //
//*       ======================================================              //

const express = require("express");
const passport = require("passport");
const partiesModel = require("../models/partiesModel");
const reviewModel = require("../models/reviewsModel");
const router = express.Router();
const usersModel = require("../models/usersModel");

//*-------------------------- END §SECTION IMPORTS -------------------------- */

//        ======================================================              //
//*       =============== SECTION  ROUTES ======================              //
//        ======================================================              //
/* -------------------------------------------------------------------------- */
//*                        SECTION GET ROUTES                                 */
/* -------------------------------------------------------------------------- */

//*----------------------- SECTION TEST ROUTE ------------------------------- */

router.get("/test", (req, res) => {
  res.send({ msg: 123 });
});

//*------------------------- END §SECTION TEST ROUTE ------------------------ */

//*--------------------- SECTION GET ALL Reviews ---------------------------- */

router.get("/all", (req, res) => {
  reviewModel
    .find({})
    .populate({
      path: "user",
      // select: ["_id", "name"],
    })
    .populate({
      path: "party",
      // select: ["_id", "name"],
    })
    .then((parties) => {
      res.send(parties);
    })
    .catch((err) => res.send(err));
});

//*----------------------- END §SECTION GET ALL Review ---------------------- */
//*------------------------- END §SECTION GET ROUTES ------------------------ */

/* -------------------------------------------------------------------------- */
//*                        SECTION POST ROUTES                                */
/* -------------------------------------------------------------------------- */

//*------------------------ SECTION NEW Review ------------------------------ */

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const reqUser = req.body.user;
    const reqParty = req.body.party;
    const reqDate = req.body.date;
    const reqRating = req.body.rating || 1;
    const reqText = req.body.text || "";

    //? CREATING A Review
    const newReview = new reviewModel({
      user: reqUser,
      party: reqParty,
      date: reqDate,
      rating: reqRating,
      text: reqText,
      display: true,
    });

    //? ADDING Review TO USER DATA
    usersModel
      .updateOne(
        { _id: newReview.user },
        { $addToSet: { reviews: newReview._id } },
        (err, user) => {
          if (err) {
            res.json({ error: err });
          }
          if (user) {
            console.log(user);
          }
        }
      )
      .catch((err) => res.send(err));

    //? ADDING Review TO PARTY DATA
    partiesModel
      .updateOne(
        { _id: newReview.party },
        { $addToSet: { reviews: newReview._id } },
        (err, party) => {
          if (err) {
            res.json({ error: err });
          }
          if (party) {
            console.log(party);
          }
        }
      )
      .catch((err) => res.send(err));

    //? SAVING Review AND SENDING RES
    newReview
      .save()
      .then((review) => {
        res.send(review);
      })
      .catch((err) => {
        res.send(err);
      });
  }
);

//*------------------------- END §SECTION NEW Review ------------------------ */

//*--------------------------- SECTION EDIT Review -------------------------- */

router.post(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(`req.body.rating`, req.body.rating);
    reviewModel.findById(req.body._id).then((review) => {
      if (review.user.equals(req.user._id)) {
        const review = reviewModel
          .findOneAndUpdate(
            { _id: req.body._id },
            { $set: { text: req.body.text, rating: req.body.rating } },
            { useFindAndModify: false }
          )
          .catch((err) => res.send(err));
      }
    });
  }
);

//*---------------------- END §SECTION EDIT Review -------------------------- */

//*-------------------------- SECTION DELETE Review ------------------------- */

router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(`req.body.rating`, req.body.rating);
    reviewModel.findById(req.body._id).then((review) => {
      if (review.user.equals(req.user._id)) {
        const review = reviewModel
          .findOneAndUpdate(
            { _id: req.body._id },
            { $set: { display: false } },
            { useFindAndModify: false }
          )
          .catch((err) => res.send(err));
      }
    });
  }
);

//*----------------------- END §SECTION DELETE Review ----------------------- */

//*------------------------ END §SECTION POST ROUTES ------------------------ */
//*--------------------------- END §SECTION ROUTES -------------------------- */

/* -------------------------------------------------------------------------- */
//       ====================================================== //
//*      =============== SECTION EXPORT ======================= //
//       ====================================================== //

module.exports = router;

//*--------------------------- END §SECTION EXPORT -------------------------- */
