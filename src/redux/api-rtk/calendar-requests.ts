import { CreateTraining, Training } from '../../types/calendar-types';

import { api } from './api';

export const calendarRequests = api.injectEndpoints({
    endpoints: (builder) => ({
        getTraining: builder.query<Training[], void>({
            query: () => 'training',
        }),
        createTraining: builder.mutation<Training, CreateTraining>({
            query: (training) => ({
                url: 'training',
                body: training,
                method: 'POST',
            }),
        }),
        getTrainingListInfo: builder.query<string, void>({
            query: () => 'catalogs/training-list',
        }),
        editTraining: builder.mutation<Training, { id: string; training: Training }>({
            query: ({ training, id }) => ({
                url: `training/${id}`,
                body: training,
                method: 'PUT',
            }),
        }),
    }),
});

export const {
    useGetTrainingListInfoQuery,
    useGetTrainingQuery,
    useCreateTrainingMutation,
    useEditTrainingMutation,
} = calendarRequests;
