const axios = require('axios');

const task2Api = axios.create({
    baseURL: 'http://localhost:5001/user/',
});

const AddUser = userData => task2Api.post('/addUser', { userData });

module.exports = { AddUser };
