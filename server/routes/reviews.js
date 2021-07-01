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
//*       ======================= IMPORTS ======================              //
//*       ======================================================              //

const express = require("express");
const passport = require("passport");
const partiesModel = require("../models/partiesModel");
const reviewModel = require("../models/reviewsModel");
const router = express.Router();
const usersModel = require("../models/usersModel");

/* -------------------------------------------------------------------------- */
//        ======================================================              //
//*       =======================  ROUTES ======================              //
//        ======================================================              //
/* -------------------------------------------------------------------------- */
//*                                GET ROUTES                                 */
/* -------------------------------------------------------------------------- */

//*------------------------------- TEST ROUTE ------------------------------- */

router.get("/test", (req, res) => {
  res.send({ msg: 123 });
});

//*----------------------------- GET ALL Reviews ---------------------------- */

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

/* -------------------------------------------------------------------------- */
//*                                POST ROUTES                                */
/* -------------------------------------------------------------------------- */

//*-------------------------------- NEW Review ------------------------------ */

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //TODO protected route
    // console.log(req.body);
    const reqUserId = req.body.userId;
    const reqParty = req.body.party;
    const reqDate = req.body.date;
    const reqRating = req.body.rating || 1;
    const reqText = req.body.text || "";

    //? CREATING A Review
    const newReview = new reviewModel({
      user: reqUserId,
      party: reqParty,
      date: reqDate,
      rating: reqRating,
      text: reqText,
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

/* -------------------------------------------------------------------------- */
//       ====================================================== //
//*      ======================= EXPORT ======================= //
//       ====================================================== //

module.exports = router;

/* -------------------------------------------------------------------------- */
