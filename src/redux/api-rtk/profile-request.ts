import { Tariff, User } from '../../types/profile-types';

import { api } from './api';

export const profileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserInfo: builder.query<void, void>({
            query: () => 'user/me',
        }),
        getCatalogsTariffList: builder.query<void, void>({
            query: () => 'catalogs/tariff-list',
        }),
        editUserInfo: builder.mutation<User, User>({
            query: (user) => ({
                url: 'user',
                body: user,
                method: 'PUT',
            }),
        }),
        buyNewTariff: builder.mutation<Tariff, Tariff>({
            query: (tariff: Tariff) => ({
                url: 'tariff',
                body: tariff,
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useGetUserInfoQuery,
    useEditUserInfoMutation,
    useGetCatalogsTariffListQuery,
    useBuyNewTariffMutation,
} = profileApi;
