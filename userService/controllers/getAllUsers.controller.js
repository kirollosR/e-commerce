const { validationResult } = require('express-validator');
const User = require('../models/user.model');

getAllUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    } catch (error){
        res.statusCode = 500;
        res.send({ message: error });
    }
}

module.exports = getAllUsers;