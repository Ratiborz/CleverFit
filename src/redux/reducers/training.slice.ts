import { createSlice } from '@reduxjs/toolkit';

import { Training } from '../../types/calendar-types';
import { DataForInputs, TrainingDataPals, UserDataForDrawer } from '../../types/trainings-types';

interface ITraining {
    repeatRequest: boolean;
    trainingData: Training[];
    catalogTariffNames: [];
    dataForInputs: DataForInputs[];
    editFlow: boolean;
    randomChoiceState: boolean;
    dataTrainingPals: {
        data: TrainingDataPals[];
        idTypeTraining: string;
    };
    commonTrainingState: boolean;
    userDataForDrawer?: UserDataForDrawer;
}

const initialState: ITraining = {
    repeatRequest: false,
    trainingData: [],
    catalogTariffNames: [],
    dataForInputs: [],
    editFlow: false,
    randomChoiceState: false,
    dataTrainingPals: {
        data: [],
        idTypeTraining: '',
    },
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
            console.log(state.dataTrainingPals);
        },
        setCommonTrainingState: (state, { payload }) => {
            state.commonTrainingState = payload;
        },
        setUserDataForDrawer: (state, { payload }) => {
            state.userDataForDrawer = payload;
            console.log(state.userDataForDrawer);
        },
    },
});

export const { actions, reducer } = trainingSlice;
