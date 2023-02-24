const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = mongoose.Schema(
    {
        name: { type: String },
        email: {
            type: String,
        },
        pass: {
            type: String,
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
