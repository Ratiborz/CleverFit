import { maskStyle } from '@constants/constants';
import { Paths } from '@constants/paths';
import { warningSelector } from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { history } from '@redux/configure-store';
import { actions } from '@redux/reducers/feedback.slice';
import { Button, Image, Modal, Typography } from 'antd';

import styles from './modal-error.module.scss';

export const ModalError = () => {
    const dispatch = useAppDispatch();
    const isModalOpen = useAppSelector(warningSelector);

    return (
        <Modal
            maskStyle={maskStyle}
            centered={true}
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
            className={styles.modal}
        >
            <Image
                src='/result/Result.svg'
                className={styles.card__img}
                alt='not-valid'
                preview={false}
            />
            <h3 className={styles.card__h3}>Что-то пошло не так</h3>
            <Typography className={styles.card__descrip}>
                Произошла ошибка, попробуйте ещё раз.
            </Typography>
            <Button
                className={styles.card__btn}
                onClick={() => {
                    history.push(Paths.MAIN);
                    dispatch(actions.setWarning(false));
                }}
            >
                Назад
            </Button>
        </Modal>
    );
};
