import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { defaultItemPerPage, sortByValues } from '@constants/constants';
import { trainingsDataSelector } from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/training.slice';
import { mirrorDate } from '@utils/utils';
import { Button, Pagination, Select } from 'antd';
import moment from 'moment';

import { TrainingListLi } from './training-list-li/training-list-li';

import styles from './training-table.module.scss';

type Props = {
    setOpen: (arg: boolean) => void;
};

export const TrainingTable = ({ setOpen }: Props) => {
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const trainingData = useAppSelector(trainingsDataSelector);
    const [infoCard, setInfoCard] = useState({ date: '', name: '' });
    const [sort, setSort] = useState('');

    const handleEditTraining = (name: string, date: string, infoCard?: string) => {
        dispatch(actions.setEditFlowTraining(true));
        const currentDateSelect = mirrorDate(date.slice(0, 10));

        const exercisesData = trainingData.filter(
            (training) =>
                training?.name === name &&
                mirrorDate(training.date.slice(0, 10)) === currentDateSelect,
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

        console.log(date);
        dispatch(actions.setDataForInputs(updatedExercisesData));

        if (infoCard) {
            setInfoCard({ date, name });
        } else {
            setOpen(true);
        }
    };

    const sortingTraining = (e: string) => {
        setSort(e);
    };

    return (
        <React.Fragment>
            <div className={styles.header__table} data-test-id='my-trainings-table'>
                <p className={styles.header__title}>Тип тренировки</p>
                <Select
                    placeholder='Сортировка по периоду'
                    bordered={false}
                    className={styles.select}
                    onChange={(e) => sortingTraining(e)}
                    options={sortByValues.map((name) => ({
                        value: name,
                        label: name,
                    }))}
                />
            </div>
            <div className={styles.container__body_table}>
                <ul className={styles.training__list_ul}>
                    <TrainingListLi
                        currentPage={currentPage}
                        infoCard={infoCard}
                        handleEditTraining={handleEditTraining}
                        setOpen={setOpen}
                        setInfoCard={setInfoCard}
                        sort={sort}
                    />
                </ul>
            </div>
            {trainingData.length >= 10 && (
                <Pagination
                    size='small'
                    total={trainingData.length}
                    defaultPageSize={defaultItemPerPage}
                    onChange={(page) => setCurrentPage(page)}
                />
            )}
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
