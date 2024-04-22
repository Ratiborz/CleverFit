import { RootState } from '@redux/configure-store';

export const requestTrainingListSelector = (state: RootState) => state.training.repeatRequest;
export const trainingsDataSelector = (state: RootState) => state.training.trainingData;
export const trainingTariffNamesSelector = (state: RootState) => state.training.catalogTariffNames;
export const dataForInputsSelector = (state: RootState) => state.training.dataForInputs;
export const editFlowTrainingSelector = (state: RootState) => state.training.editFlow;
export const randomStateSelector = (state: RootState) => state.training.randomChoiceState;
export const trainingDataPalsSelector = (state: RootState) => state.training.dataTrainingPals;
export const commonTrainingFlowSelector = (state: RootState) => state.training.commonTrainingState;
export const userDataForDrawerSelector = (state: RootState) => state.training.userDataForDrawer;
