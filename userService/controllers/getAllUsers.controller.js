const User = require('../models/user.model');

const getAllUsers = async (req, res) => {
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
    } catch (error) {
        console.error('Error:', error);
        res.status(error.status || 500).json(error.data || { error });
    }
}

module.exports = getAllUsers;