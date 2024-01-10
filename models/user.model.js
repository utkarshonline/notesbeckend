const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: String,
    pass: String,
    email: String,
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);
// *!  collection name will be users not user mongoo add s itself.

module.exports = {
  UserModel,
};
