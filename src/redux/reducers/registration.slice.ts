import { createSlice } from '@reduxjs/toolkit';

interface requestState {
    rememberMe: boolean;
}

const initialState: requestState = {
    rememberMe: false,
};

export const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setRemember: (state, action) => {
            state.rememberMe = action.payload;
            console.log(state.rememberMe);
        },
    },
});

export const { actions, reducer } = registrationSlice;
