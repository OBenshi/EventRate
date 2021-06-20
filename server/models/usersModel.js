const mongoose = require("mongoose");
const subReferencesPopulate = require("mongoose-sub-references-populate");
const UserSchema = new mongoose.Schema({
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
  // reviews: {
  //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  // },
  reviews: {
    type: mongoose.Schema.Types.ObjectId,
    subRef: "Party.reviews",
  },
});
UserSchema.plugin(subReferencesPopulate);
const UserModel = mongoose.model("Message", UserSchema);
module.exports = UserModel;
// module.exports = mongoose.model("User", UserSchema);
