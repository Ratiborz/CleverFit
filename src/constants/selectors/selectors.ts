import { RootState } from '@redux/configure-store';

export const isModalOpenSelector = (state: RootState) => state.commonModal.warning;
