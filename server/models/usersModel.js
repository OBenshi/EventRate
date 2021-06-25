const mongoose = require("mongoose");
const subReferencesPopulate = require("mongoose-sub-references-populate");
const userSchema = new mongoose.Schema({
  // _id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   unique: true,
  // },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
    unique: false,
  },
  birthday: {
    type: Date,
    required: true,
    unique: false,
  },
  reviews: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
  },
  // reviews: {
  //   type: [
  //     {
  //       _id: { type: mongoose.Schema.Types.ObjectId,subRef: "Party.reviews"},
  //       user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  //       party: { type: mongoose.Schema.Types.ObjectId, ref: "Party" },
  //       date: { type: Date },
  //       rating: { type: Number },
  //       text: { type: String },
  //     },
  //   ],
  // },
  // reviews: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   subRef: "Party.reviews",
  // },
});
// UserSchema.plugin(subReferencesPopulate);

module.exports = mongoose.model("user", userSchema);
// module.exports = mongoose.model("User", UserSchema);
