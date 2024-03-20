import { AxiosResponse } from 'axios';

import { ConfirmPassword, RegistrValue, Values } from '../types/value-request';

import { httpClient } from './axios-config';

export const registrationRequest = async (values: RegistrValue): Promise<AxiosResponse> =>
    httpClient.post('auth/registration', {
        email: values.email,
        password: values.password,
    });

export const authLogin = async (values: Values): Promise<AxiosResponse> =>
    httpClient.post('auth/login', {
        email: values.email,
        password: values.password,
    });

export const checkEmail = async (values: string): Promise<AxiosResponse> =>
    httpClient.post('auth/check-email', {
        email: values,
    });

export const confirmEmail = async (email: string, code: string): Promise<AxiosResponse> =>
    httpClient.post('auth/confirm-email', {
        email,
        code,
    });

export const changePassword = async (values: ConfirmPassword): Promise<AxiosResponse> =>
    httpClient.post('auth/change-password', {
        password: values.password,
        confirmPassword: values.confirm,
    });
