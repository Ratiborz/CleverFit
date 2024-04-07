import { createSlice } from '@reduxjs/toolkit';

interface Modal {
    warning: boolean;
    warningOpen: boolean;
    modalError: boolean;
}

const initialState: Modal = {
    warning: false,
    warningOpen: false,
    modalError: false,
};

export const commonModalSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setWarning: (state, { payload }) => {
            state.warning = payload;
        },
        setErrorWithOpen: (state, { payload }) => {
            state.warningOpen = payload;
        },
        setModalError: (state, { payload }) => {
            state.modalError = payload;
        },
    },
});

export const { actions, reducer } = commonModalSlice;
