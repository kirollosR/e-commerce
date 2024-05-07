const repository = require('../repositories/user.repository');
const User = require('../models/user.model');


const authorized = async (req, res, next) => {
    const {token} = req.headers;
    try {
        const userId = await repository.getIdByToken(token);
        const user = await User.findById(userId);
        if(user){
            next();
        } else {
            // throw { status: 403, data: {message: "You are not authorized to access this page"} };
            res.statusCode = 403;
            res.send({
                message: "You are not authorized to access this page",
            });
        }
    } catch (error) {
        console.error('Error:', error);
        // res.status(error.status || 500).json(error.data || error );
        console.log(error.status);
        if(error.status === 500){
            res.status(error.status || 500).json(error.data || error );
        } else {
            res.statusCode = 403;
            res.send({
                message: "You are not authorized to access this page",
            });
        }
    }
}

module.exports = authorized;