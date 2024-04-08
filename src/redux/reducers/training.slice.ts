import { createSlice } from '@reduxjs/toolkit';

import { Training } from '../../types/calendar-types';
import { DataForInputs } from '../../types/trainings-types';

interface ITraining {
    repeatRequest: boolean;
    trainingData: Training[];
    catalogTariffNames: [];
    dataForInputs: DataForInputs[];
}

const initialState: ITraining = {
    repeatRequest: false,
    trainingData: [],
    catalogTariffNames: [],
    dataForInputs: [],
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
        setDataForInputs: (state, { payload }) => {
            state.dataForInputs = payload;
        },
    },
});

export const { actions, reducer } = trainingSlice;
