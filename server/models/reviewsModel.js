const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  party: { type: mongoose.Schema.Types.ObjectId, ref: "party", required: true },
  date: { type: Date, required: true },
  rating: { type: Number, required: true },
  text: { type: String, required: true },
  display: { type: Boolean, required: true },
});
module.exports = mongoose.model("review", reviewSchema);
