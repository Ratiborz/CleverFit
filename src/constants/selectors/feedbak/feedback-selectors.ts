import { RootState } from '@redux/configure-store';

export const warningSelector = (state: RootState) => state.feedback.warning;
export const beFeedbackSelector = (state: RootState) => state.feedback.isFeedbackData;
export const isModalCreateFeedbackSelector = (state: RootState) =>
    state.feedback.isModalCreateFeedbackOpen;
export const isCreateFeedbackSuccessSelector = (state: RootState) =>
    state.feedback.isCreateFeedbackSuccess;
export const StateModalErrorSelector = (state: RootState) => state.feedback.StateModalError;
export const dataReviewSelector = (state: RootState) => state.feedback.dataReview;
