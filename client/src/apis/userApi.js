import axios from 'axios';

const userApi = axios.create({
    baseURL: 'http://localhost:5001/user',
});

export const getUsers = () => userApi.get('/');
// export const countLetters = paragraph => task2Api.post('/countletters', { paragraph });
// export const writecharacter = paragraph => task2Api.post('/writecharacters', { paragraph });

const apis = {
    getUsers,
    // countLetters,
    // writecharacter,
}

export default apis;