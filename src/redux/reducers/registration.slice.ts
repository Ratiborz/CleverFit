import { createSlice } from '@reduxjs/toolkit';

interface RequestState {
    rememberMe: boolean;
    email: string;
    loading: boolean;
}

const initialState: RequestState = {
    rememberMe: false,
    email: '',
    loading: false,
};

export const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setRemember: (state, action) => {
            state.rememberMe = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { actions, reducer } = registrationSlice;
