import React, { useState } from 'react';
import { ModalSaveError } from '@components/result/common-modal-result/modal-save-error/modal-save-error';
import {
    editFlowTrainingSelector,
    trainingsDataSelector,
} from '@constants/selectors/training/training-selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/training.slice';
import { Alert, Button } from 'antd';

import { DrawerTraining } from '../drawer/drawer';

import { TrainingTable } from './training-table/training-table';

import styles from './my-trainings.module.scss';

export const MyTrainings = () => {
    const dispatch = useAppDispatch();
    const trainingData = useAppSelector(trainingsDataSelector);
    const [open, setOpen] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const editFlow = useAppSelector(editFlowTrainingSelector);

    const openDrawer = () => {
        setOpen(true);
    };

    const setAlertState = () => {
        setShowSuccessAlert(false);
        dispatch(actions.setEditFlowTraining(false));
    };

    return (
        <React.Fragment>
            <ModalSaveError />
            {trainingData.length === 0 ? (
                <div className={styles.container__no_training}>
                    <h1 className={styles.title__no_training}>
                        У вас ещё нет созданных тренировок
                    </h1>
                    <Button className={styles.create_training__btn} onClick={() => openDrawer()}>
                        Создать тренировку
                    </Button>
                </div>
            ) : (
                <TrainingTable setOpen={setOpen} />
            )}
            <DrawerTraining
                setOpen={setOpen}
                open={open}
                setShowSuccessAlert={setShowSuccessAlert}
            />
            {showSuccessAlert ? (
                <Alert
                    data-test-id='create-training-success-alert'
                    message={
                        editFlow
                            ? 'Тренировка успешно обновлена'
                            : 'Новая тренировка успешно добавлена'
                    }
                    type='success'
                    className={styles.alert__success}
                    showIcon={true}
                    closable={true}
                    onClose={() => setAlertState()}
                />
            ) : (
                ''
            )}
        </React.Fragment>
    );
};
