const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "please enter your fullname"],
      minlength: 5,
      trim: true,
    },
    username: {
      type: String,
      required: [true, "please enter your username"],
      minlength: 5,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "please enter your fullname"],
      minlength: 5,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please enter your password"],
      minlength: 8,
      trim: true,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
