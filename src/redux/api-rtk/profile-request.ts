import { api } from './api';

export const profileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserInfo: builder.query<void, void>({
            query: () => 'user/me',
        }),
    }),
});

export const { useGetUserInfoQuery } = profileApi;
