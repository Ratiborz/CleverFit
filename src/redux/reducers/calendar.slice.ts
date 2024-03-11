import { Exercise, Training } from '../../types/calendarTypes';
import { createSlice } from '@reduxjs/toolkit';

interface Modal {
    warning: boolean;
    repeatRequest: boolean;
    trainingData: Training[];
}

const initialState: Modal = {
    warning: false,
    repeatRequest: false,
    trainingData: [],
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
            console.log(state.trainingData);
        },
    },
});

export const { actions, reducer } = calendarSlice;

// trainingData: {
//     id: '',
//     name: '',
//     date: '',
//     userId: '',
//     parameters: {
//         repeat: false,
//         period: 7,
//         jointTraining: false,
//         participants: [],
//     },
//     exercises: [],
// }
