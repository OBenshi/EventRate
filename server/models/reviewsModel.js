const mongoose = require("mongoose");
// const subReferencesPopulate = require("mongoose-sub-references-populate");
const reviewSchema = new mongoose.Schema({
  // _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  party: { type: mongoose.Schema.Types.ObjectId, ref: "party", required: true },
  date: { type: Date, required: true },
  rating: { type: Number, required: true },
  text: { type: String, required: true },
});
// reviewSchema.plugin(subReferencesPopulate);
module.exports = mongoose.model("review", reviewSchema);
