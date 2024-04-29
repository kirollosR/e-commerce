const User = require('../models/user.model');
const { validationResult } = require('express-validator');

updateUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // TODO: take user from token
        const id = req.params.id;
        const data = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
            });
        }

        // TODO: check if user want to update username if yes check if the new username is already taken

        Object.keys(data).forEach(key => {
            console.log(key);
            //if key = username 
            //check if the new username is already taken with post endpoint logic
            user[key] = data[key];
        });

        await user.save();

        return res.status(200).json({
            success: true,
            updated_user: user,
            message: 'User updated!',
        });


    } catch (error) {
        res.statusCode = 500;
        res.send({ message: error });
    }

}

module.exports = updateUser;