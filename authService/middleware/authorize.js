const User = require('../models/auth-model');

getAllUsers = async (req, res) => {
    try{
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error){
        res.statusCode = 500;
        res.send({ message: error });
    }
}


healthCheck = (req, res) => {
    res.status(200).json({
        StatusCode: 200,
        message: 'User Service is up and running'
    });
}

module.exports = healthCheck;
module.exports = getAllUsers;