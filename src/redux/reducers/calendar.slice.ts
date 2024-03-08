import { createSlice } from '@reduxjs/toolkit';

interface Modal {
    warning: boolean;
    repeatRequest: boolean;
    createTrainingModal: boolean;
}

const initialState: Modal = {
    warning: false,
    repeatRequest: false,
    createTrainingModal: true,
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setErrorWithOpen: (state, { payload }) => {
            state.warning = payload;
        },
        setRepeatRequest: (state, { payload }) => {
            state.repeatRequest = payload;
        },
        setCreateTrainingModal: (state, { payload }) => {
            state.createTrainingModal = payload;
        },
    },
});

export const { actions, reducer } = calendarSlice;
