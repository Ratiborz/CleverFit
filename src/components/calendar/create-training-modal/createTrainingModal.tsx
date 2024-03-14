import styles from './createTrainingModal.module.scss';
import { useState } from 'react';
import { ChooseTypeWorkout } from '../choose-type-workout/chooseTypeWorkout';
import { TrainingList } from '../training-list/trainingList';
import type { Moment } from 'moment';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { modalErrorWithSaveSelector } from '@constants/selectors';
import { Button, Modal } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { actions } from '@redux/reducers/calendar.slice';
import { maskStyle } from '@constants/constants';
import { Training } from '../../../types/calendarTypes';

type Props = {
    date: string;
    handleClose: () => void;
    isRightPosition: boolean;
    trainingNames: string[];
    dateMoment: Moment;
    tranings: Training[];
};

export const CreateTrainingModal = ({
    date,
    handleClose,
    isRightPosition,
    trainingNames,
    dateMoment,
    tranings,
}: Props) => {
    const dispatch = useAppDispatch();
    const [addExercises, setAddExercises] = useState(false);
    const modalErrorWithSave = useAppSelector(modalErrorWithSaveSelector);

    const swapModal = () => {
        dispatch(actions.setSelectedTraining(''));
        setAddExercises(!addExercises);
    };

    const closeModals = () => {
        dispatch(actions.setModalError(false));
        handleClose();
    };

    return (
        <>
            {addExercises ? (
                <ChooseTypeWorkout
                    isRightPosition={isRightPosition}
                    trainingNames={trainingNames}
                    swapModal={swapModal}
                    dateMoment={dateMoment}
                />
            ) : (
                <TrainingList
                    isRightPosition={isRightPosition}
                    date={date}
                    trainingNames={trainingNames}
                    swapModal={swapModal}
                    handleClose={handleClose}
                    tranings={tranings}
                    dateMoment={dateMoment}
                />
            )}

            <Modal
                maskStyle={maskStyle}
                centered
                closable={false}
                footer={false}
                open={modalErrorWithSave}
                className={styles.modal_error}
            >
                <CloseCircleOutlined style={{ color: 'red', fontSize: 22, marginRight: 16 }} />
                <div className={styles.modal_description}>
                    <h2 className={styles.modal_title}>При сохранении данных произошла ошибка </h2>
                    <p className={styles.modal_message}>Придётся попробовать ещё раз</p>
                    <div className={styles.wrapper__btn}>
                        <Button className={styles.btn__close} onClick={() => closeModals()}>
                            Закрыть
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
