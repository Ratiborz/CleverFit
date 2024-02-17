import { Values } from '@components/registration/registration';
import axios, { AxiosResponse } from 'axios';

export const httpClient = axios.create({
    baseURL: 'https://marathon-api.clevertec.ru',
    headers: {},
});

export const registrationRequest = async (values: Values): Promise<AxiosResponse> => {
    return httpClient.post('/auth/registration', {
        email: values.email,
        password: values.password,
    });
};
