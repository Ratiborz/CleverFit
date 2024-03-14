import { InputsData, Training, TrainingsListItem } from '../../types/calendarTypes';
import { createSlice } from '@reduxjs/toolkit';

interface Modal {
    warning: boolean;
    repeatRequest: boolean;
    trainingData: Training[];
    trainingsList: TrainingsListItem[];
    inputsData: InputsData[];
    selectedTraining: string;
    modalError: boolean;
}

const initialState: Modal = {
    warning: false,
    repeatRequest: false,
    trainingData: [],
    trainingsList: [],
    inputsData: [],
    selectedTraining: '',
    modalError: false,
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
        setModalError: (state, { payload }) => {
            state.modalError = payload;
        },
    },
});

export const { actions, reducer } = calendarSlice;
