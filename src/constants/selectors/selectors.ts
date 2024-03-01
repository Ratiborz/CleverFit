import { RootState } from '@redux/configure-store';

export const repeatRequestsSelector = (state: RootState) => state.repeatRequests;
export const rememberMeSelector = (state: RootState) => state.registration.rememberMe;
export const loadingSelector = (state: RootState) => state.registration.loading;
export const emaildataSelector = (state: RootState) => state.repeatRequests.emailCheck;
export const emailValueSelector = (state: RootState) => state.registration.email;
export const newDataPassSelector = (state: RootState) => state.repeatRequests;
export const emailValueRegistration = (state: RootState) => state.registration.email;

export const warningSelector = (state: RootState) => state.feedback.warning;
export const beFeedbackSelector = (state: RootState) => state.feedback.isFeedbackData;
export const feedbackDataSelector = (state: RootState) => state.feedback.feedbackData;
