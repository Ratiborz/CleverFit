import { RootState } from '@redux/configure-store';

export const requestTrainingListSelector = (state: RootState) => state.training.repeatRequest;
