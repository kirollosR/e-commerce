const User = require('../models/user.model');

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        console.log(user);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
            });
        }
        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.statusCode = 500;
        res.send({ message: error });
    }
}

module.exports = getUserById;