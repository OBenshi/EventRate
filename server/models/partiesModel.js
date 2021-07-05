//========================================================
//
//*  #####     ###    #####    ######  ##  #####   ####
//*  ##  ##   ## ##   ##  ##     ##    ##  ##     ##
//*  #####   ##   ##  #####      ##    ##  #####   ###
//*  ##      #######  ##  ##     ##    ##  ##        ##
//*  ##      ##   ##  ##   ##    ##    ##  #####  ####
//
//*  ###    ###   #####   ####    #####  ##
//*  ## #  # ##  ##   ##  ##  ##  ##     ##
//*  ##  ##  ##  ##   ##  ##  ##  #####  ##
//*  ##      ##  ##   ##  ##  ##  ##     ##
//*  ##      ##   #####   ####    #####  ######
//
//========================================================

// ====================================================== //
//*=================== SECTION IMPORTS ================== //
// ====================================================== //

const mongoose = require("mongoose");

//*-------------------------- END §SECTION IMPORTS -------------------------- */

// ====================================================== //
//* ================ SECTION PARTY SCHEMA ================ //
// ====================================================== //

const partySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  location: {
    type: String,
    required: true,
  },
  Djs: {
    type: [{ type: String }],
    required: false,
  },
  musical_genre: {
    type: Array,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  img: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  reviews: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
  },
  organizers: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    required: true,
  },
  post_date: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  display: {
    type: Boolean,
    required: true,
  },
});

//*------------------------ END §SECTION PARTY SCHEMA ----------------------- */

// ====================================================== //
//* =================== SECTION EXPORT =================== //
// ====================================================== //

module.exports = mongoose.model("party", partySchema);

//*--------------------------- END §SECTION EXPORT -------------------------- */
