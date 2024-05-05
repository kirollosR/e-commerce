const axios = require('axios');

const userApi = axios.create({
    baseURL: 'http://user-service:5001/user',
});

const AddUser = userData => userApi.post('/',  userData );
const getUser = token => userApi.get(`/getUserData/${token}`);

module.exports = { AddUser
                ,getUser};
