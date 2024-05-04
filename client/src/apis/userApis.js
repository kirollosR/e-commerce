import { data } from 'autoprefixer';
import axios from 'axios';

const userApi = axios.create({
    baseURL: 'http://user-service:5001/user',
});

export const getUsers = () => userApi.get('/');
export const deleteUser = id => userApi.delete(`/${id}`);
export const isAdmin = () => userApi.post(data)

const apis = {
    getUsers,
    deleteUser,
    isAdmin
}

export default apis;