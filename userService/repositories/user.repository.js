const User = require('../models/user.model');

function userRepository() {
    const addUser = (data, res) => {
        const user = new User(data);
        console.log(user);

        if (!user) {
            return res.status(400).json({ success: false, error: err });
        }

        user
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    id: user._id,
                    message: 'User created!',
                });
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'User not created!',
                });
            });
    };

    return {
        addUser,
    };
}

module.exports = userRepository;