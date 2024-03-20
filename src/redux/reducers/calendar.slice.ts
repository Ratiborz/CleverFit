import { createSlice } from '@reduxjs/toolkit';

import { InputsData, Training, TrainingsListItem } from '../../types/calendar-types';

interface Modal {
    warning: boolean;
    repeatRequest: boolean;
    trainingData: Training[];
    trainingsList: TrainingsListItem[];
    inputsData: InputsData[];
    selectedTraining: string;
    idKey: string;
    modalError: boolean;
    editFlow: boolean;
    pastFlow: boolean;
    readOnlyFlow: boolean;
    isMobile: boolean;
}

const initialState: Modal = {
    warning: false,
    repeatRequest: false,
    trainingData: [],
    trainingsList: [],
    inputsData: [],
    selectedTraining: '',
    idKey: '',
    modalError: false,
    editFlow: false,
    pastFlow: false,
    readOnlyFlow: false,
    isMobile: false,
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setErrorWithOpen: (state, { payload }) => {
            state.warning = payload;
        },
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
        setModalError: (state, { payload }) => {
            state.modalError = payload;
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
