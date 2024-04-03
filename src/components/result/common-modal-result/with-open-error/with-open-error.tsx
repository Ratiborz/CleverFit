import { useLocation } from 'react-router-dom';
import { CloseCircleTwoTone, CloseOutlined } from '@ant-design/icons';
import { maskStyle } from '@constants/constants';
import { Paths } from '@constants/paths';
import { withOpenModalErrorSelector } from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/calendar.slice';
import { actions as commonModal } from '@redux/reducers/common-modal.slice';
import { actions as trainingActions } from '@redux/reducers/training.slice';
import { Button, Modal, Typography } from 'antd';

import styles from './with-open-error.module.scss';

export const WithOpenError = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const isModalOpen = useAppSelector(withOpenModalErrorSelector);

    const repeatRequest = () => {
        dispatch(commonModal.setErrorWithOpen(false));

        if (location.pathname === Paths.CALENDAR) dispatch(actions.setRepeatRequest(true));
        if (location.pathname === Paths.TRAINING) dispatch(trainingActions.setRepeatRequest(true));
    };

    return (
        <Modal
            maskStyle={maskStyle}
            closeIcon={
                <div data-test-id='modal-error-user-training-button-close'>
                    <CloseOutlined />
                </div>
            }
            centered={true}
            footer={null}
            closable={true}
            open={isModalOpen}
            onCancel={() => dispatch(commonModal.setErrorWithOpen(false))}
            className={styles.modal}
        >
            <CloseCircleTwoTone className={styles.cancel_icon} />

            <div className={styles.main__wrapper}>
                <h3 className={styles.card__h3} data-test-id='modal-error-user-training-title'>
                    При открытии данных произошла ошибка
                </h3>
                <Typography
                    className={styles.card__descrip}
                    data-test-id='modal-error-user-training-subtitle'
                >
                    Попробуйте ещё раз.
                </Typography>
                <div className={styles.wrapper_btn}>
                    <Button
                        className={styles.card__btn}
                        onClick={() => repeatRequest()}
                        data-test-id='modal-error-user-training-button'
                    >
                        Обновить
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
