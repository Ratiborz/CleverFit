import { AxiosResponse } from 'axios';
import { httpClient } from './axiosConfig';
import { createFeedback } from '../types/valueRequest';

export const getFeedBacks = async (): Promise<AxiosResponse> => {
    return httpClient.get('feedback');
};

export const createFeedbacks = async (value: createFeedback): Promise<AxiosResponse> => {
    return httpClient.post('feedback', {
        message: value.textArea,
        rating: value.rate,
    });
};
