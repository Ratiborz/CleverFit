import { User } from '../../types/profile-types';

import { api } from './api';

export const profileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserInfo: builder.query<void, void>({
            query: () => 'user/me',
        }),
        editUserInfo: builder.mutation<User, User>({
            query: (user) => ({
                url: 'user',
                body: user,
                method: 'PUT',
            }),
        }),
    }),
});

export const { useGetUserInfoQuery, useEditUserInfoMutation } = profileApi;
