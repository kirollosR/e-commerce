const User = require('../models/user.model');
const repository = require('../repositories/user.repository');

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId);

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
            });
        }

        await user.remove();

        // TODO: Remove all user's orders
        // TODO: Remoce user from auth

        return res.status(200).json({
            success: true,
            message: 'User deleted!',
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(error.status || 500).json(error.data || { error: error });
    }

}

module.exports = deleteUser;