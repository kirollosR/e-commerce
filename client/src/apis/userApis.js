import { data } from 'autoprefixer';
import axios from 'axios';

const userApi = axios.create({
    baseURL: 'http://localhost:5001/user',
});

export const getUsers = () => userApi.get('/');
export const deleteUser = id => userApi.delete(`/${id}`);
export const getUser = userToken => userApi.get(`/getUser`, { headers: { token: userToken } });
export const isAdmin = () => userApi.post(data);

const apis = {
    getUsers,
    deleteUser,
    getUser,
    isAdmin
}

export default apis;