import { TrainingInviteStatus } from '@constants/constants';
import {
    deleteInvite,
    setCatalogUserJointTrainingStatus,
    setInviteList,
} from '@redux/reducers/training.slice';

import {
    ErrorTypeResponse,
    InviteIdData,
    InviteResponse,
    InviteStatusData,
    TcreateInvite,
    TrainingInviteResponse,
} from '../../types/trainings-types';

import { api } from './api';

export const inviteApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getInvites: builder.query<InviteResponse[], void>({
            query: () => 'invite',

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(setInviteList(data));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        createInvite: builder.mutation<TrainingInviteResponse, TcreateInvite>({
            query: (training) => ({
                url: 'invite',
                body: training,
                method: 'POST',
            }),
            async onQueryStarted({ to }, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;

                    dispatch(
                        setCatalogUserJointTrainingStatus({
                            id: to,
                            status: TrainingInviteStatus.PENDING,
                        }),
                    );
                } catch (error) {
                    console.log(error);
                }
            },
            invalidatesTags: ['Invite'],
        }),
        responseToInvite: builder.mutation<TrainingInviteResponse, InviteStatusData>({
            query: (body) => ({
                url: 'invite',
                method: 'PUT',
                body,
            }),
            async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;

                    dispatch(deleteInvite(id));
                    dispatch(setCatalogUserJointTrainingStatus({ id, status }));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        deleteInvite: builder.mutation<ErrorTypeResponse, InviteIdData>({
            query: ({ inviteId }) => ({
                url: `invite/${inviteId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useCreateInviteMutation,
    useResponseToInviteMutation,
    useGetInvitesQuery,
    useDeleteInviteMutation,
} = inviteApi;
