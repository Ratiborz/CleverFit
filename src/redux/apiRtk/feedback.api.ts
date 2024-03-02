import { СreateFeedback, GetFeedbacksResponse } from '../../types/valueRequest';
import { api } from './api';

export const feedbackApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFeedBacks: builder.query<GetFeedbacksResponse, void>({
            query: () => 'feedback',
            providesTags: ['Feedback'],
        }),
        createFeedbacks: builder.mutation<GetFeedbacksResponse, СreateFeedback>({
            query: (feedback) => ({
                body: feedback,
                url: 'feedback',
                method: 'POST',
            }),
            invalidatesTags: ['Feedback'],
        }),
    }),
});

export const { useCreateFeedbacksMutation, useGetFeedBacksQuery } = feedbackApi;
