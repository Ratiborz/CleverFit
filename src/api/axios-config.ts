import { sessionToken, storageToken } from '@utils/storage';
import axios, { InternalAxiosRequestConfig } from 'axios';

export const httpClient = axios.create({
    baseURL: 'https://marathon-api.clevertec.ru/',
    withCredentials: true,
});

httpClient.interceptors.request.use(
    (config): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>> => {
        const updatedConfig = { ...config };

        console.log(updatedConfig);
        updatedConfig.headers.Authorization = `Bearer ${
            storageToken.getItem('accessToken') || sessionToken.getItem('accessToken')
        }`;

        return updatedConfig;
    },
);
