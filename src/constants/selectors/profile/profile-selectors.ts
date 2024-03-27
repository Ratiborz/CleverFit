import { RootState } from '@redux/configure-store';

export const userInfoDataSelector = (state: RootState) => state.repeatRequests.userInfo;
export const tariffDataSelector = (state: RootState) => state.profile.tariffData;
