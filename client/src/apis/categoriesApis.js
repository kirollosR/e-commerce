import { data } from 'autoprefixer';
import axios from 'axios';

const CategoryApi = axios.create({
    baseURL: 'http://127.0.0.1:5003',
});

// export const getUsers = () => userApi.get('/');
// export const deleteUser = id => userApi.delete(`/${id}`);
// export const isAdmin = () => userApi.post(data)

export const getAllcategories = () => CategoryApi.get('/categories/')
export const Addcategories = (name) => CategoryApi.post('/categories/',{ name })
export const Deletecategory = (id) => CategoryApi.delete(`/categories/${id}`)
export const getCategoryID = (id) => CategoryApi.get(`/categories/id${id}`)

const apis = {
    getAllcategories,
    Addcategories,
    Deletecategory,
    getCategoryID
}

export default apis;