import { createSlice } from '@reduxjs/toolkit';

interface Training {
    repeatRequest: boolean;
}

const initialState: Training = {
    repeatRequest: false,
};

export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        setRepeatRequest: (state, { payload }) => {
            state.repeatRequest = payload;
        },
    },
});

export const { actions, reducer } = trainingSlice;
