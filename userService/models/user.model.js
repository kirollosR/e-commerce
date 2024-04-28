const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        // name
        // role
        // email
        // username
        // phone
        // address
    },
    {timestamps: true}
)

module.exports = mongoose.model('users', userSchema);