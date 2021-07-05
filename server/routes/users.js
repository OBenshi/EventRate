//=============================================================
//
//*  ##   ##   ####  #####  #####     ####
//*  ##   ##  ##     ##     ##  ##   ##
//*  ##   ##   ###   #####  #####     ###
//*  ##   ##     ##  ##     ##  ##      ##
//*   #####   ####   #####  ##   ##  ####
//
//*  #####     #####   ##   ##  ######  #####   ####
//*  ##  ##   ##   ##  ##   ##    ##    ##     ##
//*  #####    ##   ##  ##   ##    ##    #####   ###
//*  ##  ##   ##   ##  ##   ##    ##    ##        ##
//*  ##   ##   #####    #####     ##    #####  ####
//
//=============================================================

/* -------------------------------------------------------------------------- */
//*       ======================================================              //
//*       =============== SECTION IMPORTS ======================              //
//*       ======================================================              //

//* server imports
const express = require("express");
const router = express.Router();

//*security imports
const bcrypt = require("bcrypt");
const secretOrKey = require("../config.js").secretOrKey;
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

//*models import
const userModel = require("../models/usersModel");
const partiesModel = require("../models/partiesModel");
const reviewModel = require("../models/reviewsModel");

//* ----------------------- END §SECTION IMPORTS ---------------------------- */

//        ======================================================              //
//*       ================ SECTION  ROUTES =====================              //
//        ======================================================              //
/* -------------------------------------------------------------------------- */
//*                        SECTION GET ROUTES                                 */
/* -------------------------------------------------------------------------- */

//*------------------------SECTION TEST ROUTE ------------------------------- */

router.get("/test", (req, res) => {
  // res.send({ msg: process.env.MY_TRY });
  reviewModel
    .updateMany({}, { $set: { display: true } })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => res.send(err));
});
//* ----------------------- END §SECTION TEST ROUTE -------------------------- */

//*----------------------- SECTION GET ALL USERS ----------------------------- */

router.get("/all", (req, res) => {
  userModel
    .find({})
    .populate({
      path: "reviews",
      select: ["_id", "party", "rating"],
      populate: { path: "party", select: ["_id", "name"] },
    })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => res.send(err));
});

//* --------------------- END §SECTION GET ALL USERS --------------------------------- */

//*------------------------ END SECTION GET USER PROFILE ----------------------------- */

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userModel
      .find({ _id: req.user._id })
      // .populate("reviews")
      .populate({
        path: "reviews",
        populate: { path: "party", select: ["_id", "name"] },
      })
      .then((users) => {
        res.send(users);
      })
      .catch((err) => res.send(err));
    // res.send(req.user);
  }
);

//* -------------------- END §SECTION GET USER PROFILE ----------------------- */
//* ---------------------- END §SECTION POST ROUTES -------------------------- */

/* -------------------------------------------------------------------------- */
//*                        SECTION POST ROUTES                                */
/* -------------------------------------------------------------------------- */

//*------------------------- SECTION SIGN-UP -------------------------------- */

router.post(
  "/signup",
  body("username").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  (req, res) => {
    //TODO error handling
    const reqEmail = req.body.email;
    const reqUsername = req.body.username;
    const reqPassword = req.body.password;
    const reqFirstName = req.body.firstName;
    const reqLastName = req.body.lastName;
    const reqBirthday = req.body.birthday;
    const reqReviews = req.body.reviews || [];
    const reqOwnParties = req.body.ownParties || [];

    userModel.findOne({ email: reqEmail }, (err, user) => {
      if (err) {
        res.json({ error: err });
      }
      if (user) {
        res.send("Email is already used");
      } else {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(reqPassword, salt, (err, hash) => {
            const newUser = new userModel({
              email: reqEmail,
              username: reqUsername,
              password: hash,
              firstName: reqFirstName,
              lastName: reqLastName,
              birthday: reqBirthday,
              reviews: reqReviews || [],
              own_parties: reqOwnParties || [],
            });
            newUser
              .save()
              .then((user) => {
                const options = {
                  id: user._id,
                };
                const token = jwt.sign(options, secretOrKey, {
                  expiresIn: "8h",
                });
                res.status(200).send({ user, token });
              })
              .catch((err) => {
                res.status(500).json({ error: err });
              });
          });
        });
      }
    });
  }
);

//*-------------------------- END §SECTION SIGN - UP-------------------------- * /

//*------------------------------ SECTION LOGIN --------------------------------- */

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  userModel.findOne({ email: email }, (err, user) => {
    if (err) {
      res.json({ error: "Email does not exist" });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.json({ error: err });
        }
        if (result) {
          const options = {
            id: user._id,
          };
          const token = jwt.sign(options, secretOrKey, { expiresIn: "8h" });
          res.json({
            success: true,
            token: token,
          });
        } else {
          res.json({ error: "password does not match" });
        }
      });
    }
    if (user) {
      user.loggedIn = true;
      user.save();
    }
  });
});

//* --------------------------- END §SECTION LOGIN --------------------------- */

//* ------------------------------ SECTION LOGOUT ----------------------------- */

router.get("/logout", (req, res) => {
  userModel
    .findOneAndUpdate({ _id: req.body._id }, { $set: { loggedIn: false } })
    .then((user) => res.send(user));
});

//* --------------------------- END §SECTION LOGOUT -------------------------- */
//* ------------------------ END §SECTION POST ROUTES ------------------------ */
//* --------------------------- END §SECTION ROUTES -------------------------- */

/* -------------------------------------------------------------------------- */
//       ====================================================== //
//*      ======================= EXPORT ======================= //
//       ====================================================== //

module.exports = router;

/* -------------------------------------------------------------------------- */
