const User = require('../models/user.model');
const { validationResult } = require('express-validator');
const { getIdByTokenApi } = require('../apis/authApis');
const repository = require('../repositories/user.repository');


const updateUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userId = await repository.getIdByToken(req.params.token);
        console.log(userId);

        const data = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
            });
        }

        Object.keys(data).forEach(key => {
            user[key] = data[key];
        });

        await user.save();

        return res.status(200).json({
            success: true,
            updatedUser: user,
            message: 'User updated!',
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(error.status || 500).json(error.data || { error: error });
    }
}

module.exports = updateUser;
