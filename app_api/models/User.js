const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    moodleToken: {
      type: String,
      unique: true,
      min: 32,
      max: 32,
      required: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      min: 6,
    },
    moodleUserID: {
      type: Number,
      required: false,
    },
    courses: [],
    userImage: {
      type: String,
    },
  },
  { strict: false }
);

module.exports = mongoose.model("User", UserSchema);
