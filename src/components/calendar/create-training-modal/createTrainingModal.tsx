import { Button, Divider, Modal, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/calendar.slice';
import styles from './createTrainingModal.module.scss';
import { createTrainingModalSelector } from '@constants/selectors';

export const CreateTrainingModal = () => {
    const dispatch = useAppDispatch();
    const isModalOpen = useAppSelector(createTrainingModalSelector);

    return (
        <Modal
            mask={false}
            maskClosable={false}
            centered
            style={{ maxWidth: '264px' }}
            footer={null}
            closable={true}
            open={isModalOpen}
            onCancel={() => dispatch(actions.setCreateTrainingModal(false))}
            className={styles.modal}
        >
            <div className={styles.wrapper_header}>
                <h3 className={styles.modal__h3}>Тренировки на 09.01.2024</h3>
                <Typography className={styles.modal__descrip}>Нет активных тренировок</Typography>
            </div>
            <Divider />
            <Button className={styles.modal__btn}>Создать тренировку</Button>
        </Modal>
    );
};
