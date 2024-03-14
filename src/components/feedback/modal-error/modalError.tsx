import { Button, Image, Modal, Typography } from 'antd';
import styles from './modalError.module.scss';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/feedback.slice';
import { StateModalErrorSelector } from '@constants/selectors/selectors';
import { maskStyle } from '@constants/constants';

export const ModalFaildCreate = () => {
    const dispatch = useAppDispatch();
    const isModalError = useAppSelector(StateModalErrorSelector);

    const handleChangeModal = () => {
        dispatch(actions.createFeedback(true));
        dispatch(actions.setStateModalError(false));
    };

    const handleState = () => dispatch(actions.setStateModalError(false));

    return (
        <Modal
            maskStyle={maskStyle}
            centered
            open={isModalError}
            closable={false}
            className={styles.modal}
            title=''
            footer={false}
        >
            <Image src='/result/cancel-cross.svg' preview={false} className={styles.modal__img} />
            <h2 className={styles.modal__title}>Данные не сохранились</h2>
            <Typography className={styles.modal__description}>
                Что-то пошло не так. Попробуйте ещё раз.
            </Typography>
            <div className={styles.wrapper__btn}>
                <Button
                    data-test-id='write-review-not-saved-modal'
                    className={styles.modal__btn}
                    onClick={() => handleChangeModal()}
                >
                    Написать отзыв
                </Button>
                <Button className={styles.modal__btn_cancel} onClick={() => handleState()}>
                    Закрыть
                </Button>
            </div>
        </Modal>
    );
};
