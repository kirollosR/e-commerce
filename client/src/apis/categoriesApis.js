import { data } from 'autoprefixer';
import axios from 'axios';

const userApi = axios.create({
    baseURL: 'http://categoryservice:5003',
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