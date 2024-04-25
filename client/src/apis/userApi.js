import axios from 'axios';

const userApi = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// export const countLetters = paragraph => task2Api.post('/countletters', { paragraph });
// export const writecharacter = paragraph => task2Api.post('/writecharacters', { paragraph });

const apis = {
    // countLetters,
    // writecharacter,
}

export default apis;