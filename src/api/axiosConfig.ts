import { storageToken } from '@utils/storage';
import axios from 'axios';

const token = storageToken.getItem('accessToken');

export const httpClient = axios.create({
    baseURL: 'https://marathon-api.clevertec.ru/',
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
});

export const http = axios.create({
    baseURL: 'https://marathon-api.clevertec.ru/',
    headers: {},
    withCredentials: true,
});
