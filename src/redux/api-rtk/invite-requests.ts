import { api } from './api';

export const inviteApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createInvite: builder.mutation({
            query: (training) => ({
                url: 'invite',
                body: training,
                method: 'POST',
            }),
        }),
    }),
});

export const { useCreateInviteMutation } = inviteApi;
