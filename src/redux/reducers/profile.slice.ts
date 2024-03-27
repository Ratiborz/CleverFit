import { createSlice } from '@reduxjs/toolkit';

import { TariffData } from '../../types/profile-types';

interface ProfileState {
    tariffData?: TariffData;
}

const initialState: ProfileState = {};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setDataTariff: (state, { payload }) => {
            console.log(payload);
            state.tariffData = payload;
        },
    },
});

export const { actions, reducer } = profileSlice;
