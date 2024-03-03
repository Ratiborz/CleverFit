import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { sessionToken, storageToken } from '@utils/storage';

// const localAccessToken = storageToken.getItem('accessToken');
// const sessionAccessToken = sessionToken.getItem('accessToken');
// const token = localAccessToken ?? sessionAccessToken;

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Feedback'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru/',
        prepareHeaders: (headers, { getState }) => {
            const localAccessToken = storageToken.getItem('accessToken');
            const sessionAccessToken = sessionToken.getItem('accessToken');
            const token = localAccessToken ?? sessionAccessToken;
            headers.set('Authorization', `Bearer ${token}`);

            return headers;
        },
    }),
    endpoints: () => ({}),
});
