import { Button, Modal, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { withOpenModalErrorSelector } from '@constants/selectors';
import styles from './withOpenError.module.scss';
import { actions } from '@redux/reducers/calendar.slice';
import { CloseCircleTwoTone } from '@ant-design/icons';

export const WithOpenError = () => {
    const dispatch = useAppDispatch();
    const isModalOpen = useAppSelector(withOpenModalErrorSelector);

    const repeatRequest = () => {
        dispatch(actions.setErrorWithOpen(false));
        dispatch(actions.setRepeatRequest(true));
    };

    return (
        <Modal
            centered
            footer={null}
            closable={true}
            open={isModalOpen}
            onCancel={() => dispatch(actions.setErrorWithOpen(false))}
            className={styles.modal}
        >
            <CloseCircleTwoTone className={styles.cancel_icon} />
            <div className={styles.main__wrapper}>
                <h3 className={styles.card__h3}>При открытии данных произошла ошибка </h3>
                <Typography className={styles.card__descrip}>Попробуйте ещё раз.</Typography>
                <div className={styles.wrapper_btn}>
                    <Button className={styles.card__btn} onClick={() => repeatRequest()}>
                        Обновить
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
