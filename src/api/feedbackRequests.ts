import { AxiosResponse } from 'axios';
import { httpClient } from './axiosConfig';

export const getFeedBacks = async (): Promise<AxiosResponse> => {
    return httpClient.get('feedback');
};
