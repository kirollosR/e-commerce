import { data } from 'autoprefixer';
import axios from 'axios';

const CategoryApi = axios.create({
    baseURL: 'http://localhost:5003',
});

// export const getUsers = () => userApi.get('/');
// export const deleteUser = id => userApi.delete(`/${id}`);
// export const isAdmin = () => userApi.post(data)

export const getAllcategories = () => CategoryApi.get('/categories/')
export const Addcategories = (name) => CategoryApi.post('/categories/',{ name })
export const Deletecategory = (id) => CategoryApi.delete(`/categories/${id}`)

const apis = {
    getAllcategories,
    Addcategories,
    Deletecategory
}

export default apis;