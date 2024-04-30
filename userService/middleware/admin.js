const repository = require('../repositories/user.repository');
const User = require('../models/user.model');

// const admin = async (req, res, next) => {
//     console.log("1");
//     const {token} = req.headers;
//     console.log("2");
//     const userId = await repository.getIdByToken(token);
//     console.log("3");
//     const user = await User.findById(userId);
//     console.log("4");
//     console.log(user);
//     // const admin = await query("select * from user where token = ?", [token]);
//     if(user.role === "admin"){
//         next();
//     } else {
//         // throw { status: 403, data: {message: "You are not authorized to access this page"} };
//         res.statusCode = 403;
//         res.send({
//             message: "You are not authorized to access this page",
//         });
//     }
// }

const admin = async (req, res, next) => {
    const {token} = req.headers;
    try {
        const userId = await repository.getIdByToken(token);
        const user = await User.findById(userId);
        // const admin = await query("select * from user where token = ?", [token]);
        if(user && user.role === "admin"){
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

module.exports = admin;