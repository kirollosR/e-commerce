const User = require('../models/user.model');
const { getIdByTokenApi } = require('../apis/authApis');

const checkUsernameExists = async (username) => {
    count = await User.countDocuments({ username: username });
    // console.log(count);
    return count > 0 ? true : false;
    
}

const getIdByToken = async (token) => {
    try {
        const response = await getIdByTokenApi(token);
        return response.data.userID;
    } catch (error) {
        if (error.response) {
            throw { status: error.response.status, data: error.response.data };
        } else {
            console.log('Error', error.message);
            throw { status: 500, message: "Auth service is under maintenance" };
        }
    }
}


module.exports = {
    checkUsernameExists,
    getIdByToken,
};