import { Button, Image, Modal } from 'antd';
import styles from './successModal.module.scss';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/feedback.slice';
import { isCreateFeedbackSuccessSelector } from '@constants/selectors';
import { maskStyle } from '@constants/constants';

export const SuccessModal = () => {
    const dispatch = useAppDispatch();
    const isCreateFeedbackSuccess = useAppSelector(isCreateFeedbackSuccessSelector);

    const handleState = () => dispatch(actions.setStateCreateFeedback(false));

    return (
        <Modal
            maskStyle={maskStyle}
            centered
            open={isCreateFeedbackSuccess}
            closable={false}
            className={styles.modal}
            title=''
            footer={false}
        >
            <Image src='/result/Suggested-Icon.svg' preview={false} className={styles.modal__img} />
            <h2 className={styles.modal__title}>Отзыв успешно опубликован</h2>
            <Button className={styles.modal__btn} onClick={() => handleState()}>
                Отлично
            </Button>
        </Modal>
    );
};
