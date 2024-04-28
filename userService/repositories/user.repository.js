const User = require('../models/user.model');

function userRepository() {
    const checkUsernameExists = async (username) => {
        count = await User.countDocuments({ username: username });
        // console.log(count);
        return count > 0 ? true : false;
        
    }

    // const addUser = async (data, res) => {
    //     const user = new User(data);
    //     console.log(user);

    //     if (!user) {
    //         return res.status(400).json({ success: false, error: err });
    //     }

    //     await user
    //         .save()
    //         .then(() => {
    //             return res.status(201).json({
    //                 success: true,
    //                 id: user._id,
    //                 message: 'User created!',
    //             });
    //         })
    //         .catch(error => {
    //             return res.status(400).json({
    //                 error,
    //                 message: 'User not created!',
    //             });
    //         });
    // };

    return {
        // addUser,
        checkUsernameExists,
    };
}

module.exports = userRepository;