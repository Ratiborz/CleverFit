import { RootState } from '@redux/configure-store';

export const isModalOpenSelector = (state: RootState) => state.commonModal.warning;
export const withOpenModalErrorSelector = (state: RootState) => state.commonModal.warningOpen;
