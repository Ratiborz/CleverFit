import { RootState } from '@redux/configure-store';

export const requestTrainingListSelector = (state: RootState) => state.training.repeatRequest;
export const trainingsDataSelector = (state: RootState) => state.training.trainingData;
export const trainingTariffNamesSelector = (state: RootState) => state.training.catalogTariffNames;
