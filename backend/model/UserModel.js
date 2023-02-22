const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, maxLength: 15, minLength: 4 },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: validator.isEmail,
    },
    pass: {
      type: String,
      required: true,
      minLength: 4,
    },
    phone: {
      type: String,
      required: true,
      minLength: 10,
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
    },
  },
  {
    versionKey: false,
  }
);
const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
