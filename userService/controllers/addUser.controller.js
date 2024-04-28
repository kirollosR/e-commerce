const Repository = require('../repositories/user.repository');
const { validationResult } = require('express-validator');

const repository = new Repository();


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
            return res.status(400).json({
                success: false,
                error: 'Username already exists',
            });
        }

        await repository.addUser(body, res);
        // console.log(user);

    } catch (error){
        res.statusCode = 500;
        res.send({ message: error });
    }
}

module.exports = addUser;