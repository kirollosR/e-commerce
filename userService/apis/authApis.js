const axios = require('axios');

const authApi = axios.create({
    baseURL: 'http://auth-service:5000/auth',
});

const getIdByTokenApi = token => authApi.get(`/getIDbyToken/${token}`);

module.exports = { getIdByTokenApi };