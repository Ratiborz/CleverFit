import { Values } from '@pages/registration-page/registration-page';
import { AxiosResponse } from 'axios';
import { RegistrValue, confirmPassword } from '../types/value-request';
import { http, httpClient } from './axiosConfig';

export const registrationRequest = async (values: RegistrValue): Promise<AxiosResponse> => {
    return httpClient.post('auth/registration', {
        email: values.email,
        password: values.password,
    });
};

export const authLogin = async (values: Values): Promise<AxiosResponse> => {
    return httpClient.post('auth/login', {
        email: values.email,
        password: values.password,
    });
};

export const checkEmail = async (values: string): Promise<AxiosResponse> => {
    return httpClient.post('auth/check-email', {
        email: values,
    });
};

export const confirmEmail = async (email: string, code: string): Promise<AxiosResponse> => {
    return httpClient.post('auth/confirm-email', {
        email: email,
        code: code,
    });
};

export const changePassword = async (values: confirmPassword): Promise<AxiosResponse> => {
    return http.post('auth/change-password', {
        password: values.password,
        confirmPassword: values.confirm,
    });
};
