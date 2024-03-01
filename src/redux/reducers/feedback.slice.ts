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
    lastFeedback: feedbackData[];
    feedbackData: feedbackData[];
}

const initialState: feedback = {
    warning: false,
    isFeedbackData: false,
    isModalCreateFeedbackOpen: false,
    lastFeedback: [],
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
            if (payload.countFeedback === 'firstLoad') {
                state.feedbackData = payload.data;
                state.lastFeedback = payload.data.slice(-4);
            }
        },
        createFeedback: (state, { payload }) => {
            state.isModalCreateFeedbackOpen = payload;
        },
    },
});

export const { actions, reducer } = feedbackSlice;
