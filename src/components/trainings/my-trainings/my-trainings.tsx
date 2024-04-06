import React, { useState } from 'react';
import { trainingsDataSelector } from '@constants/selectors/training/training-selectors';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Button } from 'antd';
import { DrawerTraining } from '../drawer/drawer';

import styles from './my-trainings.module.scss';

export const MyTrainings = () => {
    const trainingData = useAppSelector(trainingsDataSelector);
    const [open, setOpen] = useState(false);

    const openDrawer = () => setOpen(true);

    return (
        <React.Fragment>
            {trainingData.length > 0 && (
                <div className={styles.container__no_training}>
                    <h1>У вас ещё нет созданных тренировок</h1>
                    <Button className={styles.create_training__btn} onClick={() => openDrawer()}>
                        Создать тренировку
                    </Button>
                </div>
            )}
            <DrawerTraining setOpen={setOpen} open={open} />
        </React.Fragment>
    );
};
