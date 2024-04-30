const repository = require('../repositories/user.repository');
const { validationResult } = require('express-validator');
const User = require('../models/user.model');


addUser = async (req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = req.body;

        // Check if username already exists
        count = await repository.checkUsernameExists(body.username);
        // console.log(count);
        if(count){
            console.log('Username already exists');
            return res.status(403).json({
                success: false,
                error: 'Username already exists',
            });
        }

        const user = new User(body);
        console.log(user);

        await user
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    id: user._id,
                    message: 'User created!',
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    error,
                    message: 'User not created!',
                });
            });
        // console.log(user);

    } catch (error){
        res.statusCode = 500;
        res.send({ message: error });
    }
}

module.exports = addUser;