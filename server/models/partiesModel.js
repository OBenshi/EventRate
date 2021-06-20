const mongoose = require("mongoose");
const subReferencesPopulate = require("mongoose-sub-references-populate");
const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  party: { type: mongoose.Schema.Types.ObjectId, ref: "Party" },
  date: { type: Date },
  rating: { type: Number },
  text: { type: String },
});
const ReviewModel = mongoose.model("Review", ReviewSchema);

const PartySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  location: {
    type: String,
    required: true,
    unique: false,
  },
  djs: {
    type: String,
    required: false,
    unique: false,
  },
  musical_genre: {
    type: Array,
    required: false,
    unique: false,
  },
  rating: {
    type: Number,
    required: false,
    unique: false,
  },
  img: {
    type: String,
    required: false,
    unique: false,
  },
  description: {
    type: String,
    required: false,
    unique: false,
  },
  // reviews: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }] },
  reviews: {
    type: [
      new mongoose.Schema({
        _id: { type: mongoose.Schema.Types.ObjectId },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        // party: { type: mongoose.Schema.Types.ObjectId, ref: "Party" },
        date: { type: Date },
        rating: { type: Number },
        text: { type: String },
      }),
    ],
  },
  //   type: [
  //     {
  //       user: { type: mongoose.Schema.Types.ObjectId, ref: "Review.User" },
  //       // party: { type: mongoose.Schema.Types.ObjectId, ref: "Party" },
  //       date: { type: Date },
  //       rating: { type: Number },
  //       text: { type: String },
  //     },
  //   ],
  // },
  // _id: { type: mongoose.Schema.Types.ObjectId },
});
// const PartyModel = mongoose.model("Party", PartySchema);
// module.exports = PartyModel;
PartySchema.plugin(subReferencesPopulate);
module.exports = mongoose.model("Party", PartySchema);
