import { createSlice } from '@reduxjs/toolkit';

import { Training } from '../../types/calendar-types';
import {     CatalogTrainingPalsResponse,
DataForInputs,     InviteResponse,
TrainingDataPals ,
    UserDataForDrawer,
} from '../../types/trainings-types';


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
        dataInputs?: Training;
    };
    commonTrainingState: boolean;
    userDataForDrawer?: UserDataForDrawer;
    inviteList: InviteResponse[];
    usersTrainingPals: CatalogTrainingPalsResponse[];
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
    inviteList: [],
    usersTrainingPals: [],
};

export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        setRepeatRequest: (state, { payload }) => {
            state.repeatRequest = payload;
        },
        setDataTraining: (state, action) => {
            state.trainingData = action.payload;
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
        },
        setCatalogUserJointTrainingStatus: (state, { payload }) => {
            const { id, status } = payload;

            state.dataTrainingPals.data = state.dataTrainingPals.data.map((training) =>
                training.id === id ? { ...training, status } : training,
            );
        },
        setInviteList: (state, { payload }) => {
            state.inviteList = payload;
            console.log(state.inviteList);
        },
        deleteInvite: (state, { payload }) => {
            state.inviteList = state.inviteList.filter((invite) => invite._id !== payload);
        },
        setUsersTrainingPals: (state, { payload }) => {
            state.usersTrainingPals = payload;

            console.log(state.usersTrainingPals);
        },
    },
});

export const { actions, reducer } = trainingSlice;

export const {
    setCatalogUserJointTrainingStatus,
    setInviteList,
    deleteInvite,
    setUsersTrainingPals,
} = actions;
