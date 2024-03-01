import { Button, Image, Modal, Typography } from 'antd';
import s from './modalError.module.scss';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/feedback.slice';

export const ModalError = () => {
    const dispatch = useAppDispatch();
    const isModalOpen = useAppSelector((state) => state.feedback.warning);

    return (
        <Modal
            centered
            footer={null}
            closable={false}
            bodyStyle={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 550,
            }}
            open={isModalOpen}
            className={s.modal}
        >
            <Image
                src='/result/Result.svg'
                className={s.card__img}
                alt='not-valid'
                preview={false}
            />
            <h3 className={s.card__h3}>Что-то пошло не так</h3>
            <Typography className={s.card__descrip}>
                Произошла ошибка, попробуйте ещё раз.
            </Typography>
            <Button className={s.card__btn} onClick={() => dispatch(actions.setWarning(false))}>
                Назад
            </Button>
        </Modal>
    );
};
