import { GetFeedbacksResponse } from '../../types/value-request';

import { api } from './api';

export const trainingApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllTrainings: builder.query<GetFeedbacksResponse, void>({
            query: () => 'training',
        }),
        getCatalogTariffListTraining: builder.query<void, void>({
            query: () => 'catalogs/tariff-list',
        }),
    }),
});

export const { useLazyGetAllTrainingsQuery, useGetCatalogTariffListTrainingQuery } = trainingApi;
