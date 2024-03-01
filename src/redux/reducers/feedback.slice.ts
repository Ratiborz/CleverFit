import { createSlice } from '@reduxjs/toolkit';

type feedbackData = {
    createdAt: string;
    fullName: string;
    id: string;
    imageSrc: string;
    message: string;
    rating: number;
};

interface feedback {
    warning: boolean;
    isFeedbackData: boolean;
    feedbackData: feedbackData[];
}

const initialState: feedback = {
    warning: false,
    isFeedbackData: false,
    feedbackData: [],
};

export const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        setWarning: (state, { payload }) => {
            state.warning = payload;
        },
        setStateFeedback: (state, { payload }) => {
            state.isFeedbackData = payload;
        },
        setFeedbackData: (state, { payload }) => {
            const fulldata = payload;
            const lastFeedback = fulldata.slice(-4);
            state.feedbackData = lastFeedback;
        },
    },
});

export const { actions, reducer } = feedbackSlice;
