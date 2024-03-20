import { createSlice } from '@reduxjs/toolkit';

interface Modal {
    warning: boolean;
}

const initialState: Modal = {
    warning: false,
};

export const commonModalSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setWarning: (state, { payload }) => {
            state.warning = payload;
        },
    },
});

export const { actions, reducer } = commonModalSlice;
