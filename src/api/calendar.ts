import { AxiosResponse } from 'axios';

import { httpClient } from './axios-config';

export const getTrainingInfo = async (): Promise<AxiosResponse> => httpClient.get('training');
