//=============================================================
//*  #####     ###    #####    ######  ##  #####   ####
//*  ##  ##   ## ##   ##  ##     ##    ##  ##     ##
//*  #####   ##   ##  #####      ##    ##  #####   ###
//*  ##      #######  ##  ##     ##    ##  ##        ##
//*  ##      ##   ##  ##   ##    ##    ##  #####  ####
//
//*  #####     #####   ##   ##  ######  #####
//*  ##  ##   ##   ##  ##   ##    ##    ##
//*  #####    ##   ##  ##   ##    ##    #####
//*  ##  ##   ##   ##  ##   ##    ##    ##
//*  ##   ##   #####    #####     ##    #####
//
//=============================================================

/* -------------------------------------------------------------------------- */
//*       ======================================================              //
//*       =============== SECTION IMPORTS ======================              //
//*       ======================================================              //
const express = require("express");
const partiesModel = require("../models/partiesModel");
const usersModel = require("../models/usersModel");
const passport = require("passport");
const router = express.Router();

//*-------------------------- END §SECTION IMPORTS -------------------------- */

//        ======================================================              //
//*       ================ SECTION  ROUTES =====================              //
//        ======================================================              //
/* -------------------------------------------------------------------------- */
//*                        SECTION GET ROUTES                                 */
/* -------------------------------------------------------------------------- */
//*----------------------- SECTION TEST ROUTE ------------------------------- */

router.get("/test", (req, res) => {
  res.send({ msg: 123 });
});

//* ------------------------ END §SECTION TEST ROUTED ------------------------ */

//*--------------------- SECTION GET ALL PARTIES ---------------------------- */

router.get("/all", (req, res) => {
  partiesModel
    .find({})
    .then((parties) => {
      res.send(parties);
    })
    .catch((err) => res.send(err));
});

//
//*────────────────────────────────────────────── END §SECTION GET ALL PARTIES ─────
//

//*--------------------- SECTION GET PARTY BY NAME --------------------------- */

router.get("/:partyName", (req, res) => {
  partiesModel
    .find({ name: req.params.partyName })
    .populate({
      path: "reviews",
      populate: {
        path: "user",
        select: ["_id", "firstName", "lastName", "username"],
      },
    })
    .populate({ path: "organizers", select: ["name"] })
    .then((parties) => {
      res.send(parties);
    })
    .catch((err) => res.send(err));
});

//* ------------------ END §SECTION GET PARTY BY NAME ----------------------- */

//* ----------------------- END §SECTION GET ROUTES -------------------------- */

/* -------------------------------------------------------------------------- */
//*                        SECTION POST ROUTES                                */
/* -------------------------------------------------------------------------- */
//*---------------------- SECTION POST NEW PARTY ----------------------------- */

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //? STUB - CREATING A PARTY
    const newParty = new partiesModel({
      name: req.body.name,
      location: req.body.location,
      Djs: req.body.Djs,
      musical_genre: req.body.musical_genre,
      rating: req.body.rating || 0,
      img: req.body.img || "",
      description: req.body.description,
      reviews: req.body.reviews,
      organizers: req.body.organizers,
      post_date: req.body.post_date,
      date: req.body.date,
    });

    //? STUB - ADDING PARTY TO ORGANIZERS USER DATA
    console.log(newParty);
    for (i = 0; i < newParty.organizers.length; i++) {
      usersModel.updateOne(
        { _id: newParty.organizers[1] },
        { $addToSet: { own_parties: newParty._id } },
        (err, user) => {
          if (err) {
            res.json({ error: err });
          } else {
            newParty
              .save()
              .then((party) => {
                res.send(party);
              })
              .catch((err) => {
                res.send(err);
              });
          }
        }
      );
    }

    //? SAVING PARTY AND SENDING RES
  }
);

//*----------------------- END §SECTION POST NEW PARTY ---------------------- */
//*------------------------- END §SECTION GET PARTY ------------------------- */
//*--------------------------- END §SECTION ROUTES -------------------------- */

/* -------------------------------------------------------------------------- */
//       ====================================================== //
//*      =============== SECTION EXPORT ======================= //
//       ====================================================== //

module.exports = router;

//* -----------------------END §SECTION EXPORT -------------------------------- */
