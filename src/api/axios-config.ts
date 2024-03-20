import { sessionToken, storageToken } from '@utils/storage';
import axios from 'axios';

export const httpClient = axios.create({
    baseURL: 'https://marathon-api.clevertec.ru/',
    withCredentials: true,
});

httpClient.interceptors.request.use((config) => {
    const modifiedConfig = {
        ...config,
        headers: {
            ...config.headers,
            Authorization: `Bearer ${
                storageToken.getItem('accessToken') || sessionToken.getItem('accessToken')
            }`,
        },
    };

    return modifiedConfig;
});
