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
//todo 123
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
      display: req.body.display,
    });

    //? STUB - ADDING PARTY TO ORGANIZERS USER DATA
    console.log(newParty);
    for (i = 0; i < newParty.organizers.length; i++) {
      usersModel.updateOne(
        { _id: newParty.organizers[0] },
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
                res.json({ error: err });
              });
          }
        }
      );
    }

    //? SAVING PARTY AND SENDING RES
  }
);

//*----------------------- END §SECTION POST NEW PARTY ---------------------- */

//*--------------------------- SECTION EDIT PARTY --------------------------- */

router.post(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { _id, name, location, Djs, musical_genre, img, description, date } =
      req.body;
    console.log(`imgToSend from back`, img);
    partiesModel.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          name: name,
          location: location,
          Djs: Djs,
          musical_genre: musical_genre,
          img: img,
        },
      },
      { useFindAndModify: false, new: true },
      (err, party) => {
        if (err) {
          console.log(err);
          return res.json({ error: err });
        }
        if (party) {
          console.log(party);
          return res.json({ party: party });
        }
      }
    );
  }
);

//*------------------------- END §SECTION EDIT PARTY ------------------------ */

//*-------------------------- SECTION DELETE PARTY -------------------------- */

router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    partiesModel.findById(req.body._id).then((party) => {
      const partyToDelete = partiesModel
        .findOneAndUpdate(
          { _id: req.body._id },
          { $set: { display: false } },
          { useFindAndModify: false }
        )
        .catch((err) => res.send(err));
    });
  }
);

//*------------------------ END §SECTION DELETE PARTY ----------------------- */
//*------------------------- END §SECTION POST ROUTES ----------------------- */
//*--------------------------- END §SECTION ROUTES -------------------------- */

/* -------------------------------------------------------------------------- */
//       ====================================================== //
//*      =============== SECTION EXPORT ======================= //
//       ====================================================== //

module.exports = router;

//* -----------------------END §SECTION EXPORT -------------------------------- */
