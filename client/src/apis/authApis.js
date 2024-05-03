import axios from 'axios';

const authApi = axios.create({
    baseURL: 'http://localhost:5000/auth',
});

export const login = (username, password) => authApi.post('/login', {username, password});
export const register = (userData) => authApi.post('/register', userData)

const apis = {
    login,
    register
};

export default apis;