const mongoose = require("mongoose");
// const subReferencesPopulate = require("mongoose-sub-references-populate");
// const ReviewSchema = new mongoose.Schema({
//   _id: { type: mongoose.Schema.Types.ObjectId },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   party: { type: mongoose.Schema.Types.ObjectId, ref: "Party" },
//   date: { type: Date },
//   rating: { type: Number },
//   text: { type: String },
// });
// const ReviewModel = mongoose.model("Review", ReviewSchema);

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
});

module.exports = mongoose.model("party", partySchema);
