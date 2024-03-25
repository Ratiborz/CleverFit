import { RootState } from '@redux/configure-store';

export const userInfoDataSelector = (state: RootState) => state.repeatRequests.userInfo;
