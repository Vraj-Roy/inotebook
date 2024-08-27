const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  postedOn: { type: String, default: Date.now() },
});

mongoose.models = {};
module.exports = mongoose.model("User", userSchema);
