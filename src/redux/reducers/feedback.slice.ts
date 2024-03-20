import { createSlice } from '@reduxjs/toolkit';

type DataReview = {
    rating: number;
    message: string;
};

interface FeedBack {
    warning: boolean;
    isFeedbackData: boolean;
    isModalCreateFeedbackOpen: boolean;
    isCreateFeedbackSuccess: boolean;
    StateModalError: boolean;
    dataReview: DataReview;
}

const initialState: FeedBack = {
    warning: false,
    isFeedbackData: false,
    isModalCreateFeedbackOpen: false,
    isCreateFeedbackSuccess: false,
    StateModalError: false,
    dataReview: {
        rating: 0,
        message: '',
    },
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
        setStateCreateFeedback: (state, { payload }) => {
            state.isCreateFeedbackSuccess = payload;
        },
        setStateModalError: (state, { payload }) => {
            state.StateModalError = payload;
        },
        setDataReview: (state, { payload }) => {
            state.dataReview = payload;
        },
    },
});

export const { actions, reducer } = feedbackSlice;
