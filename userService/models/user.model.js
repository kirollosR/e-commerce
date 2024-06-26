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
        name: {type: String, required: true},
        role: {type: String, default: 'user'},
        email: {type: String, required: true},
        username: {type: String, required: true},
        phone: String,
        address: {type: String, required: true}
    },
    {timestamps: true}
)

module.exports = mongoose.model('users', userSchema);