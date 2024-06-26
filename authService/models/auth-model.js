const mongoose = require("mongoose");
const Schema = mongoose.Schema

const Auth = new Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
        token: { type: String, required: true }
    },
    { timestamps: false, versionKey: false });


module.exports = mongoose.model('users', Auth)
