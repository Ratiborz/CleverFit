import { CreateTraining, Training } from '../../types/calendarTypes';
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
    }),
});

export const { useGetTrainingListInfoQuery, useGetTrainingQuery, useCreateTrainingMutation } =
    calendarRequests;
