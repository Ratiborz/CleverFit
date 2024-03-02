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
    isModalCreateFeedbackOpen: boolean;
}

const initialState: feedback = {
    warning: false,
    isFeedbackData: false,
    isModalCreateFeedbackOpen: false,
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
        createFeedback: (state, { payload }) => {
            state.isModalCreateFeedbackOpen = payload;
        },
    },
});

export const { actions, reducer } = feedbackSlice;
