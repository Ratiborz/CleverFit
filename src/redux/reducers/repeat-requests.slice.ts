import { createSlice } from '@reduxjs/toolkit';

import { User } from '../../types/profile-types';

interface RequestState {
    email: string;
    password: string;
    emailCheck: string;
    newPassword: string;
    newPasswordConfirm: string;
    userInfo?: User;
}

const initialState: RequestState = {
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
        setDataRequest: (state, { payload }) => {
            state.emailCheck = payload;
            if (payload.email && payload.password) {
                state.email = payload.email;
                state.password = payload.password;
            }
        },
        setNewPassword: (state, { payload }) => {
            state.newPassword = payload.password;
            state.newPasswordConfirm = payload.confirm;
        },
        setUserInfo: (state, { payload }) => {
            state.userInfo = payload;
        },
    },
});

export const { actions, reducer } = repeatRequestsSlice;
