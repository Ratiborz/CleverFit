import { maskStyle } from '@constants/constants';
import { Paths } from '@constants/paths';
import { isModalOpenSelector } from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { history } from '@redux/configure-store';
import { actions } from '@redux/reducers/common-modal.slice';
import { Button, Image, Modal, Typography } from 'antd';

import styles from './bad-request-modal.module.scss';

export const BadRequstModalError = () => {
    const dispatch = useAppDispatch();
    const isModalOpen = useAppSelector(isModalOpenSelector);

    return (
        <Modal
            data-test-id='modal-no-review'
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
