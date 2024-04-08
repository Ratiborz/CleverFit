import React, { useState } from 'react';
import { trainingsDataSelector } from '@constants/selectors/training/training-selectors';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Alert, Button } from 'antd';

import { DrawerTraining } from '../drawer/drawer';

import { TrainingTable } from './training-table/training-table';

import styles from './my-trainings.module.scss';

export const MyTrainings = () => {
    const trainingData = useAppSelector(trainingsDataSelector);
    const [open, setOpen] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const openDrawer = () => setOpen(true);

    return (
        <React.Fragment>
            {trainingData.length === 0 ? (
                <div className={styles.container__no_training}>
                    <h1>У вас ещё нет созданных тренировок</h1>
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
                    data-test-id='alert'
                    message='Новая тренировка успешно добавлена'
                    type='success'
                    className={styles.alert__success}
                    showIcon={true}
                    closable={true}
                    onClose={() => setShowSuccessAlert(false)}
                />
            ) : (
                ''
            )}
        </React.Fragment>
    );
};
