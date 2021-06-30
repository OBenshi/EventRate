const mongoose = require("mongoose");
// const subReferencesPopulate = require("mongoose-sub-references-populate");
const reviewSchema = new mongoose.Schema({
  // _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  party: { type: mongoose.Schema.Types.ObjectId, ref: "party" },
  date: { type: Date },
  rating: { type: Number },
  text: { type: String },
});
// reviewSchema.plugin(subReferencesPopulate);
module.exports = mongoose.model("review", reviewSchema);
