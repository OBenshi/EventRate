const mongoose = require("mongoose");
const partySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  location: {
    type: Date,
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
});
module.exports = mongoose.model("Party", partySchema);
