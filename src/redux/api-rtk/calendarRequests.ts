import { api } from './api';

export const calendarRequests = api.injectEndpoints({
    endpoints: (builder) => ({
        getTrainingListInfo: builder.query<string[], void>({
            query: () => 'catalogs/training-list',
        }),
    }),
});

export const { useGetTrainingListInfoQuery } = calendarRequests;
