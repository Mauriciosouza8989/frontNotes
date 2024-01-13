import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://noteapi-0tjp.onrender.com'
});