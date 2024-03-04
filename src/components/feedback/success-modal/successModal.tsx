import { Button, Image, Modal } from 'antd';
import s from './successModal.module.scss';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/feedback.slice';
import { isCreateFeedbackSuccessSelector } from '@constants/selectors/selectors';

export const SuccessModal = () => {
    const dispatch = useAppDispatch();
    const isCreateFeedbackSuccess = useAppSelector(isCreateFeedbackSuccessSelector);

    return (
        <Modal
            maskStyle={{ backgroundColor: 'rgba(121, 156, 213, 0.5)', backdropFilter: 'blur(5px)' }}
            centered
            open={isCreateFeedbackSuccess}
            closable={false}
            className={s.modal}
            title=''
            footer={false}
        >
            <Image src='/result/Suggested-Icon.svg' preview={false} className={s.modal__img} />
            <h2 className={s.modal__title}>Отзыв успешно опубликован</h2>
            <Button
                className={s.modal__btn}
                onClick={() => dispatch(actions.setStateCreateFeedback(false))}
            >
                Отлично
            </Button>
        </Modal>
    );
};
