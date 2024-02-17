import { createSlice } from '@reduxjs/toolkit';

export const registrationSlice = createSlice({
    name: 'registration',
    initialState: {
        loading: false,
    },
    reducers: {
        setLoader: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { actions, reducer } = registrationSlice;
