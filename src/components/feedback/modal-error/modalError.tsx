import { Button, Image, Modal, Typography } from 'antd';
import s from './modalError.module.scss';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/feedback.slice';
import { StateModalErrorSelector } from '@constants/selectors/selectors';

export const ModalFaildCreate = () => {
    const dispatch = useAppDispatch();
    const isModalError = useAppSelector(StateModalErrorSelector);

    const handleChangeModal = () => {
        dispatch(actions.createFeedback(true));
        dispatch(actions.setStateModalError(false));
    };

    return (
        <Modal
            centered
            open={isModalError}
            closable={false}
            className={s.modal}
            title=''
            footer={false}
        >
            <Image src='/result/cancel-cross.svg' preview={false} className={s.modal__img} />
            <h2 className={s.modal__title}>Данные не сохранились</h2>
            <Typography className={s.modal__description}>
                Что-то пошло не так. Попробуйте ещё раз.
            </Typography>
            <div className={s.wrapper__btn}>
                <Button
                    className={s.modal__btn}
                    onClick={() => {
                        handleChangeModal();
                    }}
                >
                    Написать отзыв
                </Button>
                <Button
                    className={s.modal__btn_cancel}
                    onClick={() => dispatch(actions.setStateModalError(false))}
                >
                    Закрыть
                </Button>
            </div>
        </Modal>
    );
};
