const axios = require('axios');

const userApi = axios.create({
    baseURL: 'http://user-service:5001/user',
});

const AddUser = userData => userApi.post('/',  userData );
const getUser = userToken => userApi.get('/getUser', { headers: { token: userToken }});

module.exports = { AddUser
                ,getUser};
