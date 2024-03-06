import { api } from './api';

export const calendarRequests = api.injectEndpoints({
    endpoints: (builder) => ({
        getTrainingInfo: builder.query<string[], void>({
            query: () => 'training',
        }),
    }),
});

export const { useLazyGetTrainingInfoQuery } = calendarRequests;
