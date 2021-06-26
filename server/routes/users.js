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
//*       ======================= IMPORTS ======================              //
//*       ======================================================              //

const express = require("express");
const bcrypt = require("bcrypt");
const secretOrKey = require("../config.js").secretOrKey;
var jwt = require("jsonwebtoken");
const passport = require("passport");
const userModel = require("../models/usersModel");
const router = express.Router();

/* -------------------------------------------------------------------------- */
//        ======================================================              //
//*       =======================  ROUTES ======================              //
//        ======================================================              //
/* -------------------------------------------------------------------------- */
//*                                GET ROUTES                                 */
/* -------------------------------------------------------------------------- */

//*------------------------------- TEST ROUTE ------------------------------- */

router.get("/test", (req, res) => {
  res.send({ msg: process.env.MY_TRY });
});

//*------------------------------ GET ALL USERS ----------------------------- */

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

//*----------------------------- GET USER PROFILE ----------------------------- */

router.get(
  "/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userModel
      .find({ _id: req.user._id })
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
/* -------------------------------------------------------------------------- */
//*                                POST ROUTES                                */
/* -------------------------------------------------------------------------- */

//*--------------------------------- SIGN-UP -------------------------------- */

router.post("/signup", (req, res) => {
  const reqEmail = req.body.email;
  const reqUsername = req.body.username;
  const reqPassword = req.body.password;
  const reqName = req.body.name;
  const reqBirthday = req.body.birthday;
  const reqReviews = [];

  userModel.findOne({ email: reqEmail }, (err, user) => {
    if (err) {
      res.json({ error: err });
    }
    if (user) {
      res.send("Email is already used");
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(reqPassword, salt, (err, hash) => {
          const newUser = new userModel({
            email: reqEmail,
            username: reqUsername,
            password: hash,
            name: reqName,
            birthday: reqBirthday,
            reviews: reqReviews,
          });
          newUser
            .save()
            .then((user) => {
              res.send(user);
            })
            .catch((err) => {
              res.send(err);
            });
        });
      });
    }
  });
});

//*---------------------------------- LOGIN --------------------------------- */

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  userModel.findOne({ email: email }, (err, user) => {
    if (err) {
      res.send("Email does not exist");
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.send(err);
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
          res.send("password does not match");
        }
      });
    }
  });
});

/* -------------------------------------------------------------------------- */
//       ====================================================== //
//*      ======================= EXPORT ======================= //
//       ====================================================== //

module.exports = router;

/* -------------------------------------------------------------------------- */
