import { createSlice } from '@reduxjs/toolkit';

import { Training } from '../../types/calendar-types';

interface ITraining {
    repeatRequest: boolean;
    trainingData: Training[];
    catalogTariffNames: [];
}

const initialState: ITraining = {
    repeatRequest: false,
    trainingData: [],
    catalogTariffNames: [],
};

export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        setRepeatRequest: (state, { payload }) => {
            state.repeatRequest = payload;
        },
        setDataTraining: (state, { payload }) => {
            state.trainingData = payload;
            console.log(state.trainingData);
        },
        setCatalogTariffNames: (state, { payload }) => {
            state.catalogTariffNames = payload;
        },
    },
});

export const { actions, reducer } = trainingSlice;
