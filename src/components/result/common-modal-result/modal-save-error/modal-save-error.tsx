import { useLocation } from 'react-router-dom';
import { CloseCircleOutlined } from '@ant-design/icons';
import { maskStyle } from '@constants/constants';
import { modalErrorWithSaveSelector } from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/common-modal.slice';
import { Button, Modal } from 'antd';

import styles from './modal-save-error.module.scss';

type Props = {
    handleClose?: () => void;
};

export const ModalSaveError = ({ handleClose }: Props) => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const modalErrorWithSave = useAppSelector(modalErrorWithSaveSelector);

    const closeModals = () => {
        dispatch(actions.setModalError(false));
        if (location.pathname === '/calendar' && handleClose) handleClose();
        if (location.pathname === '/training' && handleClose) handleClose();
    };

    return (
        <Modal
            maskStyle={maskStyle}
            centered={true}
            closable={false}
            footer={false}
            open={modalErrorWithSave}
            className={styles.modal_error}
        >
            <CloseCircleOutlined style={{ color: 'red', fontSize: 22, marginRight: 16 }} />
            <div className={styles.modal_description}>
                <h2 className={styles.modal_title} data-test-id='modal-error-user-training-title'>
                    При сохранении данных произошла ошибка
                </h2>
                <p
                    className={styles.modal_message}
                    data-test-id='modal-error-user-training-subtitle'
                >
                    Придётся попробовать ещё раз
                </p>
                <div className={styles.wrapper__btn}>
                    <Button
                        className={styles.btn__close}
                        onClick={() => closeModals()}
                        data-test-id='modal-error-user-training-button'
                    >
                        Закрыть
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
