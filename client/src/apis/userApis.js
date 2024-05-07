import { data } from 'autoprefixer';
import axios from 'axios';

const userApi = axios.create({
    baseURL: 'http://localhost:5001/user',
});

export const getUsers = (userToken) => userApi.get('/', { headers: { token: userToken } });
export const deleteUser = (id, userToken) => userApi.delete(`/${id}`, { headers: { token: userToken } });
export const getUser = userToken => userApi.get(`/getUser`, { headers: { token: userToken } });
export const editUser = (data, userToken) => userApi.patch(`/`, data, { headers: { token: userToken } });
export const isAdmin = () => userApi.post(data);

const apis = {
    getUsers,
    deleteUser,
    getUser,
    editUser,
    isAdmin
}

export default apis;