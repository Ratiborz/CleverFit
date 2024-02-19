import { Values } from '@pages/registration-page/registration-page';
import { AxiosResponse } from 'axios';
import { httpClient } from './axios-config';

export const registrationRequest = async (values: Values): Promise<AxiosResponse> => {
    return httpClient.post('/auth/registration', {
        email: values.email,
        password: values.password,
    });
};

export const authLogin = async (values: Values): Promise<AxiosResponse> => {
    return httpClient.post('/auth/login', {
        email: values.email,
        password: values.password,
    });
};
