const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
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
  color: {
    type: String,
    required: false,
    unique: false,
  },
});
module.exports = mongoose.model("User", userSchema);
