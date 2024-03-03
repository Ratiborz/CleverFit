import { СreateFeedback, GetFeedbacksResponse } from '../../types/valueRequest';
import { api } from './api';

export const feedbackApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFeedBacks: builder.query<GetFeedbacksResponse, void>({
            query: () => 'feedback',
            providesTags: ['Feedback'],
        }),
        authGoogle: builder.query<void, void>({
            query: () => '/auth/google',
        }),
        createFeedbacks: builder.mutation<GetFeedbacksResponse, СreateFeedback>({
            query: (feedback) => ({
                body: feedback,
                url: 'feedbac',
                method: 'POST',
            }),
            invalidatesTags: ['Feedback'],
        }),
    }),
});

export const { useCreateFeedbacksMutation, useGetFeedBacksQuery, useAuthGoogleQuery } = feedbackApi;
