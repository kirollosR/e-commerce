const User = require('../models/user.model');

getAllUsers = async (req, res) => {
    try{
        const users = await User.find();
        if(!users){
            return res.status(404).json({
                message: 'No users found',
            });
        }
        res.status(200).json({
            users_count: users.length,
            users,
        });
    } catch (error){
        res.statusCode = 500;
        res.send({ message: error });
    }
}

module.exports = getAllUsers;