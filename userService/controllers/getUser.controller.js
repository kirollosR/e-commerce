const User = require('../models/user.model');
const repository = require('../repositories/user.repository');

const getUser = async (req, res) => {
    try {
        const userId = await repository.getIdByToken(req.headers.token);
        const user = await User.findById(userId);

        return res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        res.statusCode = 500;
        res.send({ error: error });
    }
}

module.exports = getUser;