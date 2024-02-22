import axios from 'axios';

export const httpClient = axios.create({
    baseURL: 'https://marathon-api.clevertec.ru',
    headers: {},
    withCredentials: true,
});

export const http = axios.create({
    baseURL: 'https://marathon-api.clevertec.ru',
    headers: {},
    withCredentials: true,
});
