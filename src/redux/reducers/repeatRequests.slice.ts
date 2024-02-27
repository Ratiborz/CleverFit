import { createSlice } from '@reduxjs/toolkit';

interface requestState {
    email: string;
    password: string;
    emailCheck: string;
    newPassword: string;
    newPasswordConfirm: string;
}

const initialState: requestState = {
    email: '',
    password: '',
    emailCheck: '',
    newPassword: '',
    newPasswordConfirm: '',
};

export const repeatRequestsSlice = createSlice({
    name: 'repeatRequests',
    initialState,
    reducers: {
        setDataRequest: (state, action) => {
            state.emailCheck = action.payload;
            if (action.payload.email && action.payload.password) {
                state.email = action.payload.email;
                state.password = action.payload.password;
            }
        },
        setNewPassword: (state, action) => {
            state.newPassword = action.payload.password;
            state.newPasswordConfirm = action.payload.confirm;
        },
    },
});

export const { actions, reducer } = repeatRequestsSlice;
