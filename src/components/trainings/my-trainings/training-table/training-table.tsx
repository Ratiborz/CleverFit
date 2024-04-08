import React, { useState } from 'react';
import { DownOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { getCurrentColor } from '@components/choose-color-badge/choose-color-badge';
import { defaultItemPerPage, sortByValues } from '@constants/constants';
import { trainingsDataSelector } from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/training.slice';
import { mirrorDate } from '@utils/utils';
import { Badge, Button, Pagination, Select } from 'antd';
import moment from 'moment';

import styles from './training-table.module.scss';

type Props = {
    setOpen: (arg: boolean) => void;
};

export const TrainingTable = ({ setOpen }: Props) => {
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const trainingData = useAppSelector(trainingsDataSelector);

    const handleEditTraining = (name: string, date: string) => {
        const currentDateSelect = mirrorDate(date.slice(0, 10));

        const exercisesData = trainingData.filter((training) => {
            const trainingDate = mirrorDate(training.date.slice(0, 10));
            console.log(trainingDate);

            return (
                training?.name === name &&
                mirrorDate(training.date.slice(0, 10)) === currentDateSelect
            );
        });

        const idTraining = exercisesData[0]?._id;

        const updatedExercisesData = exercisesData.map((training, index) => ({
            name: training.name,
            exercisesName: training.exercises[index].name,
            replays: training.exercises[index].replays || 1,
            weight: training.exercises[index].weight || 0,
            count: training.exercises[index].approaches || 1,
            date: moment(date).format('DD.MM.YYYY'),
            id: idTraining,
            period: training.parameters?.period,
        }));

        dispatch(actions.setDataForInputs(updatedExercisesData));
        console.log(updatedExercisesData);
        console.log(name, mirrorDate(date.slice(0, 10)));
        setOpen(true);
    };

    const getDataForCurrentPage = () => {
        const startIndex = (currentPage - 1) * defaultItemPerPage;
        const endIndex = startIndex + defaultItemPerPage;
        const currentTrainingData = trainingData.slice(startIndex, endIndex);

        return currentTrainingData.map((training) => (
            <li className={styles.default_li} key={training._id}>
                <div className={styles.type_training__badge}>
                    <Badge color={getCurrentColor(training.name)} className={styles.badge} />
                    <div className={styles.wrapper__type}>
                        <p>{training.name}</p>
                        <DownOutlined />
                    </div>
                </div>
                <div className={styles.date_training}>
                    <span className={styles.training__date}>
                        {mirrorDate(training.date.slice(0, 10))}
                    </span>
                    <EditOutlined
                        style={{ fontSize: 30, color: '#2F54EB' }}
                        onClick={() => handleEditTraining(training.name, training.date)}
                    />
                </div>
            </li>
        ));
    };

    return (
        <React.Fragment>
            <div className={styles.header__table}>
                <p className={styles.header__title}>Тип тренировки</p>
                <Select
                    placeholder='Сортировка по периоду'
                    bordered={false}
                    className={styles.select}
                    options={sortByValues.map((name) => ({
                        value: name,
                        label: name,
                    }))}
                />
            </div>
            <div className={styles.container__body_table}>
                <ul className={styles.training__list_ul}>{getDataForCurrentPage()}</ul>
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
                icon={<PlusOutlined />}
                className={styles.new_training__btn}
                onClick={() => setOpen(true)}
            >
                Новая тренировка
            </Button>
        </React.Fragment>
    );
};
