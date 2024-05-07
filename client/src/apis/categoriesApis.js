import { data } from 'autoprefixer';
import axios from 'axios';

const CategoryApi = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

export const getAllcategories = () => CategoryApi.get('/categories/')
export const Addcategories = (name) => CategoryApi.post('/categories/',{ name })
export const Deletecategory = (id) => CategoryApi.delete(`/categories/${id}`)
export const getCategoryByID = (id) => CategoryApi.get(`/categories/id ${id}`)
const apis = {
    getAllcategories,
    Addcategories,
    Deletecategory,
    getCategoryByID
}

export default apis;