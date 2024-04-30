const repository = require('../repositories/user.repository');
const User = require('../models/user.model');

const admin = async (req, res, next) => {
    const {token} = req.headers;
    const userId = await repository.getIdByToken(token);
    const user = await User.findById(userId);
    console.log(user);
    // const admin = await query("select * from user where token = ?", [token]);
    if(user.role === "admin"){
        next();
    } else {
        res.statusCode = 403;
        res.send({
            message: "You are not authorized to access this page",
        });
    }
}

module.exports = admin;