import { Training, TrainingsListItem } from '../../types/calendarTypes';
import { createSlice } from '@reduxjs/toolkit';

interface Modal {
    warning: boolean;
    repeatRequest: boolean;
    trainingData: Training[];
    trainingsList: TrainingsListItem[];
}

const initialState: Modal = {
    warning: false,
    repeatRequest: false,
    trainingData: [],
    trainingsList: [],
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
    },
});

export const { actions, reducer } = calendarSlice;
