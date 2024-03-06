import { AxiosResponse } from 'axios';
import { httpClient } from './axiosConfig';

export const getTrainingInfo = async (): Promise<AxiosResponse> => {
    return httpClient.get('training');
};
