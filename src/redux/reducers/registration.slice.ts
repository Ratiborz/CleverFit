import { createSlice } from '@reduxjs/toolkit';

interface requestState {
    rememberMe: boolean;
    email: string;
}

const initialState: requestState = {
    rememberMe: false,
    email: '',
};

export const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setRemember: (state, action) => {
            state.rememberMe = action.payload;
            console.log(state.rememberMe);
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
    },
});

export const { actions, reducer } = registrationSlice;
