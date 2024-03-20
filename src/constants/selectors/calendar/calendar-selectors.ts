import { RootState } from '@redux/configure-store';

export const withOpenModalErrorSelector = (state: RootState) => state.calendar.warning;
export const trainingListRepeatSelector = (state: RootState) => state.calendar.repeatRequest;
export const trainingDataSelector = (state: RootState) => state.calendar.trainingData;
export const trainingsListSelector = (state: RootState) => state.calendar.trainingsList;
export const inputsDataSelector = (state: RootState) => state.calendar.inputsData;
export const selectedTrainingSelector = (state: RootState) => state.calendar.selectedTraining;
export const modalErrorWithSaveSelector = (state: RootState) => state.calendar.modalError;
export const editFlowSelector = (state: RootState) => state.calendar.editFlow;
export const idKeySelector = (state: RootState) => state.calendar.idKey;
export const pastFlowSelector = (state: RootState) => state.calendar.pastFlow;
export const readOnlyFlowSelector = (state: RootState) => state.calendar.readOnlyFlow;
export const isMobileSelector = (state: RootState) => state.calendar.isMobile;
