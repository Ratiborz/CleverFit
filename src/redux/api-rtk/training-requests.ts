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
            invalidatesTags: [{ type: 'Training', id: 'LIST' }],
        }),
        editTrainingDrawer: builder.mutation<Training, { id: string; training: Training }>({
            query: ({ training, id }) => ({
                url: `training/${id}`,
                body: training,
                method: 'PUT',
            }),
            invalidatesTags: [{ type: 'Training', id: 'LIST' }],
        }),
    }),
});

export const {
    useLazyGetAllTrainingsQuery,
    useGetCatalogTariffListTrainingQuery,
    useSaveTrainingMutation,
    useEditTrainingDrawerMutation,
    useGetAllTrainingsQuery,
} = trainingApi;
