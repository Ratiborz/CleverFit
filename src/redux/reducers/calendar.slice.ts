import { createSlice } from '@reduxjs/toolkit';

import { InputsData, Training, TrainingsListItem } from '../../types/calendar-types';

interface Modal {
    repeatRequest: boolean;
    trainingData: Training[];
    trainingsList: TrainingsListItem[];
    inputsData: InputsData[];
    selectedTraining: string;
    idKey: string;
    editFlow: boolean;
    pastFlow: boolean;
    readOnlyFlow: boolean;
    isMobile: boolean;
}

const initialState: Modal = {
    repeatRequest: false,
    trainingData: [],
    trainingsList: [],
    inputsData: [],
    selectedTraining: '',
    idKey: '',
    editFlow: false,
    pastFlow: false,
    readOnlyFlow: false,
    isMobile: false,
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setRepeatRequest: (state, { payload }) => {
            state.repeatRequest = payload;
        },
        setTrainingData: (state, { payload }) => {
            state.trainingData = payload;
        },
        setTrainingsList: (state, { payload }) => {
            state.trainingsList = payload;
        },
        setInputsData: (state, { payload }) => {
            state.inputsData = payload;
        },
        setSelectedTraining: (state, { payload }) => {
            state.selectedTraining = payload;
        },
        setIdKey: (state, { payload }) => {
            state.idKey = payload;
        },
        setEditFlow: (state, { payload }) => {
            state.editFlow = payload;
        },
        setPastFlow: (state, { payload }) => {
            state.pastFlow = payload;
        },
        setReadOnlyFlow: (state, { payload }) => {
            state.readOnlyFlow = payload;
        },
        setIsMobile: (state, { payload }) => {
            state.isMobile = payload;
        },
    },
});

export const { actions, reducer } = calendarSlice;
