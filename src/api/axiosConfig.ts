import { sessionToken, storageToken } from '@utils/storage';
import axios from 'axios';

const localAccessToken = storageToken.getItem('accessToken');
const sessionAccessToken = sessionToken.getItem('accessToken');
const token = localAccessToken || sessionAccessToken;

export const httpClient = axios.create({
    baseURL: 'https://marathon-api.clevertec.ru/',
    withCredentials: true,
});

httpClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${
        storageToken.getItem('accessToken') || sessionToken.getItem('accessToken')
    }`;

    return config;
});

export const http = axios.create({
    baseURL: 'https://marathon-api.clevertec.ru/',
    headers: {},
    withCredentials: true,
});
