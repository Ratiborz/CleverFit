import { CreateTraining, Training } from '../../types/calendar-types';
import { GetFeedbacksResponse } from '../../types/value-request';

import { api } from './api';

export const trainingApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllTrainings: builder.query<GetFeedbacksResponse, void>({
            query: () => 'training',
            providesTags: ['Training'],
        }),
        getCatalogTariffListTraining: builder.query<void, void>({
            query: () => 'catalogs/training-list',
        }),
        saveTraining: builder.mutation<Training, CreateTraining>({
            query: (training) => ({
                url: 'training',
                body: training,
                method: 'POST',
            }),
            invalidatesTags: ['Training'],
        }),
        editTrainingDrawer: builder.mutation<Training, { id: string; training: Training }>({
            query: ({ training, id }) => ({
                url: `training/${id}`,
                body: training,
                method: 'PUT',
            }),
            invalidatesTags: ['Training'],
        }),
    }),
});

export const {
    useLazyGetAllTrainingsQuery,
    useGetCatalogTariffListTrainingQuery,
    useSaveTrainingMutation,
    useEditTrainingDrawerMutation,
} = trainingApi;
