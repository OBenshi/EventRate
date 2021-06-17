const mongoose = require("mongoose");

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
  reviews: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }] },
});
module.exports = mongoose.model("Party", PartySchema);
