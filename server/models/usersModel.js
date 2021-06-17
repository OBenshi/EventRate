const mongoose = require("mongoose");
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
  reviews: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }] },
});
module.exports = mongoose.model("User", UserSchema);
