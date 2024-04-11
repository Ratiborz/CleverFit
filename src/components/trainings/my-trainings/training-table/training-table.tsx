import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { trainingsDataSelector } from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/training.slice';
import { mirrorDate } from '@utils/utils';
import { Button } from 'antd';
import moment from 'moment';

import { TrainingListLi } from './training-list-li/training-list-li';

import styles from './training-table.module.scss';

type Props = {
    setOpen: (arg: boolean) => void;
};

export const TrainingTable = ({ setOpen }: Props) => {
    const dispatch = useAppDispatch();
    const trainingData = useAppSelector(trainingsDataSelector);
    const [infoCard, setInfoCard] = useState({ date: '', name: '' });

    const handleEditTraining = (name: string, date: string, infoCard?: string) => {
        dispatch(actions.setEditFlowTraining(true));
        const currentDateSelect = new Date(date.slice(0, 10));
        const formattedDate = currentDateSelect.toISOString().split('T')[0];

        const exercisesData = trainingData.filter(
            (training) =>
                training?.name === name &&
                mirrorDate(training.date.slice(0, 10)) === mirrorDate(formattedDate),
        );

        const idTraining = exercisesData[0]?._id;

        const updatedExercisesData = exercisesData[0].exercises.map((training) => ({
            name: exercisesData[0].name,
            exercisesName: training.name,
            replays: training.replays || 1,
            weight: training.weight || 0,
            count: training.approaches || 1,
            date: moment(date).format('DD.MM.YYYY'),
            id: idTraining,
            period: exercisesData[0].parameters?.period,
        }));

        dispatch(actions.setDataForInputs(updatedExercisesData));

        if (infoCard) {
            setInfoCard({ date, name });
        } else {
            setOpen(true);
        }
    };

    return (
        <React.Fragment>
            <div className={styles.header__table}>
                <TrainingListLi
                    infoCard={infoCard}
                    handleEditTraining={handleEditTraining}
                    setOpen={setOpen}
                    setInfoCard={setInfoCard}
                />
            </div>
            <Button
                data-test-id='create-new-training-button'
                icon={<PlusOutlined />}
                className={styles.new_training__btn}
                onClick={() => setOpen(true)}
            >
                Новая тренировка
            </Button>
        </React.Fragment>
    );
};
