const User = require('../models/user.model');

const getAllUsers = async (req, res) => {
    try{
        const users = await User.find({ role: "user"});
        console.log(users);
        if(users.length === 0 || !users){
            return res.status(404).json({
                error: 'No users found',
            });
        }
        res.status(200).json({
            users_count: users.length,
            // users,
            users: users.map(user => {
                return {
                    id: user._id,
                    username: user.username,
                    name: user.name,
                    role: user.role,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                };
            })
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(error.status || 500).json(error.data || { error });
    }
}

module.exports = getAllUsers;