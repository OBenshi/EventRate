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
  userModel
    .updateMany({}, { $set: { loggedIn: false } })
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
        populate: { path: "party" },
      })
      .populate({ path: "own_parties" })
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
              loggedIn: true,
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
//! [{ $set: { loggedIn: false } }]
router.post("/logout", (req, res) => {
  userModel.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { loggedIn: false } },
    { useFindAndModify: false },
    (err, user) => {
      if (err) {
        res.send(err);
      }
      if (user) {
        res.send(user);
      }
    }
  );
});

//* --------------------------- END §SECTION LOGOUT -------------------------- */

//* ---------------------------- SECTION EDIT USER --------------------------- */

router.post(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  body("username").optional({ checkFalsy: true }).isLength({ min: 3 }),
  body("email").optional({ checkFalsy: true }).isEmail(),
  body("firstName").optional({ checkFalsy: true }).isLength({ min: 2 }),
  body("lastName").optional({ checkFalsy: true }).isLength({ min: 2 }),
  (req, res) => {
    console.log(`999090909090909`, 999090909090909);
    const { firstName, lastName, email, password, username } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    userModel.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          username: username,
          email: email,
          firstName: firstName,
          lastName: lastName,
        },
      },
      {
        useFindAndModify: false,
        new: true,
      },
      (err, user) => {
        if (err) {
          console.log(err);
          return res.json({ error: err });
        }
        if (user) {
          console.log(user);
          return res.json({ user: user });
        }
        if (!user & !err) {
          console.log(`9095545`, 9095545);
          return res.json({ shit: true });
        }
      }
    );
  }
);
// userModel.findOne({ _id: userId }, (err, user) => {
//   if (err) {
//     res.json({ error: err });
//   }
//   if (user) {
//     if (req.body.username & (req.body.username !== "")) {
//       user.username = req.body.username;
//     }
//     if (req.body.email & (req.body.email !== "")) {
//       user.email = req.body.email;
//     }
//     if (req.body.firstName & (req.body.firstName !== "")) {
//       user.firstName = req.body.firstName;
//     }
//     if (req.body.lastName & (req.body.lastName !== "")) {
//       user.lastName = req.body.lastName;
//     }

//     user.save();
//     res.json({ üüüüü: user });
//   }
// });
// }
// );
// router.post(
//   "/edit",
//   passport.authenticate("jwt", { session: false }),
//   body("username").optional({ checkFalsy: true }).isLength({ min: 3 }),
//   body("email").optional({ checkFalsy: true }).isEmail(),
//   body("firstName").optional({ checkFalsy: true }).isLength({ min: 2 }),
//   body("lastName").optional({ checkFalsy: true }).isLength({ min: 2 }),
//   (req, res) => {
//     console.log(1);
//     console.log(`req.user.username`, req.user.username);
//     console.log(`req.body.username`, req.body.username);
//     let reqEmail, reqUsername, reqFirstName, reqLastName;
//     if (req.body.email & (req.body.email !== "")) {
//       reqEmail = req.body.email;
//     } else {
//       reqEmail = req.user.email;
//     }
//     if (req.body.username & (req.body.username !== "")) {
//       reqUsername = req.body.username;
//     } else {
//       reqUsername = req.user.username;
//     }
//     if (req.body.firstName & (req.body.firstName !== "")) {
//       reqFirstName = req.body.firstName;
//     } else {
//       reqFirstName = req.user.firstName;
//     }
//     if (req.body.lastName & (req.body.lastName !== "")) {
//       reqLastName = req.body.lastName;
//     } else {
//       reqLastName = req.user.lastName;
//     }
//     console.log(`reqUsername`, reqUsername);
//     const xUser = userModel
//       .updateOne(
//         { _id: req.user._id },
//         {
//           $set: {
//             email: reqEmail,
//             username: reqUsername,
//             firstName: reqFirstName,
//             lastName: reqLastName,
//           },
//         },
//         {
//           multi: true,
//           new: true,
//         },
//         (err, user) => {
//           if (err) {
//             res.json({ error: error });
//           }
//           if (user) {
//             res.json({ user: user });
//           }
//         }
//       )
//       .then((user) => {
//         console.log(11111, user);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   [
//     {
//       $set: {
//         email: reqEmail,
//         username: reqUsername,
//         firstName: reqFirstName,
//         lastName: reqLastName,
//       },
//     },
//   ],
//   { multi: true }
// )
// .catch((error) => {
//   res.send(error);
// });
//   }
// );

//*------------------------- END §SECTION EDIT USER ------------------------- */
//* ------------------------ END §SECTION POST ROUTES ------------------------ */
//* --------------------------- END §SECTION ROUTES -------------------------- */

/* -------------------------------------------------------------------------- */
//       ====================================================== //
//*      ======================= EXPORT ======================= //
//       ====================================================== //

module.exports = router;

/* -------------------------------------------------------------------------- */
