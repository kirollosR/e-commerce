const User = require('../models/user.model');

const authorized = async (req, res, next) => {
    const {token} = req.headers;
    const user = await User.find();
    if(user[0]){
        res.locals.user = user[0];
        next();
    } else {
        res.statusCode = 403;
        res.send({
            message: "You are not authorized to access this page",
        });
    }
}

module.exports = authorized;