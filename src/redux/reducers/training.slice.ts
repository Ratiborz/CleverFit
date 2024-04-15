import { createSlice } from '@reduxjs/toolkit';

import { Training } from '../../types/calendar-types';
import { DataForInputs, TrainingDataPals } from '../../types/trainings-types';

interface ITraining {
    repeatRequest: boolean;
    trainingData: Training[];
    catalogTariffNames: [];
    dataForInputs: DataForInputs[];
    editFlow: boolean;
    randomChoiceState: boolean;
    dataTrainingPals: TrainingDataPals[];
    commonTrainingState: boolean;
}

const initialState: ITraining = {
    repeatRequest: false,
    trainingData: [],
    catalogTariffNames: [],
    dataForInputs: [],
    editFlow: false,
    randomChoiceState: false,
    dataTrainingPals: [],
    commonTrainingState: false,
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
        setEditFlowTraining: (state, { payload }) => {
            state.editFlow = payload;
        },
        setRandomChoiceState: (state, { payload }) => {
            state.randomChoiceState = payload;
        },
        setDataTrainingPals: (state, { payload }) => {
            state.dataTrainingPals = payload;
        },
        setCommonTrainingState: (state, { payload }) => {
            state.commonTrainingState = payload;
        },
    },
});

export const { actions, reducer } = trainingSlice;
