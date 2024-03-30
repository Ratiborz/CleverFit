import React, { useEffect, useState } from 'react';
import { EditFilled, EditOutlined } from '@ant-design/icons';
import {
    isMobileSelector,
    selectedTrainingSelector,
    trainingDataSelector,
} from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/calendar.slice';
import { mirrorDate, timeConverter } from '@utils/utils';
import { Badge, Button, Divider, Image, Typography } from 'antd';
import classNames from 'classnames';
import type { Moment } from 'moment';
import moment from 'moment';

import { CloseIcon } from '../../../assets/close-icon/close-icon';
import { getCurrentColor } from '../choose-color-badge/choose-color-badge';
import { Drawerz } from '../drawer/drawer';

import styles from './training-list.module.scss';

type Props = {
    isRightPosition: boolean;
    date: string;
    trainingNames: Array<{ name: string; isImplementation: boolean | undefined }>;
    swapModal: () => void;
    handleClose: () => void;
    dateMoment: Moment;
};

export const TrainingList = ({
    isRightPosition,
    date,
    trainingNames,
    swapModal,
    handleClose,
    dateMoment,
}: Props) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const tranings = useAppSelector(trainingDataSelector);
    const selectedTraining = useAppSelector(selectedTrainingSelector);
    const isMobile = useAppSelector(isMobileSelector);

    const today = moment().format('DD.MM.YYYY');

    const isDateBeforeOrEqualToday = moment(date, 'DD.MM.YYYY').isSameOrBefore(
        moment(today, 'DD.MM.YYYY'),
        'day',
    );

    useEffect(() => {
        dispatch(actions.setPastFlow(isDateBeforeOrEqualToday));
    }, [isDateBeforeOrEqualToday, dispatch]);

    const handleEditTraining = (name: string) => {
        swapModal();
        if (isDateBeforeOrEqualToday) {
            dispatch(actions.setPastFlow(true));
        }
        dispatch(actions.setEditFlow(true));
        dispatch(actions.setSelectedTraining(name));

        const exercisesData = tranings.filter((training) => {
            const trainingDate = typeof training.date === 'number' && timeConverter(training.date);

            return (
                training?.name === name &&
                (typeof training.date === 'number'
                    ? trainingDate
                    : mirrorDate(training.date.toString().slice(0, 10))) === date
            );
        });

        const idTraining = exercisesData[0]?.id;

        const updatedExercisesData = exercisesData[0]?.exercises?.map((training) => ({
            name: training?.name || '',
            replays: training?.replays || 1,
            weight: training?.weight || 0,
            count: training?.approaches || 1,
            date,
            id: idTraining,
        }));

        dispatch(actions.setInputsData(updatedExercisesData));
    };

    const handlePasteTraining = (name: string) => {
        const exercisesData = tranings?.filter(
            (training) =>
                training?.name === name &&
                date === mirrorDate(training.date.toString().slice(0, 10)),
        );

        const idTraining = exercisesData[0]?.id;

        const updatedExercisesData = exercisesData[0]?.exercises?.map((training) => ({
            name: training?.name,
            replays: training?.replays,
            weight: training?.weight,
            count: training?.approaches,
            date,
            id: idTraining,
        }));

        dispatch(actions.setInputsData(updatedExercisesData));
        dispatch(actions.setPastFlow(true));
        dispatch(actions.setReadOnlyFlow(true));
        dispatch(actions.setEditFlow(false));
        dispatch(actions.setSelectedTraining(name));
        setOpen(true);
    };

    const modalClass = {
        true: styles.mobile,
        false: isRightPosition ? styles.modal_right : styles.modal,
    };

    return (
        <React.Fragment>
            <div
                data-test-id='modal-create-training'
                className={isMobile ? modalClass.true : modalClass.false}
            >
                <div className={styles.wrapper_header}>
                    <div>
                        <h3 className={styles.modal__h3}>{`Тренировки на ${date}`}</h3>
                        <Typography className={styles.modal__descrip}>
                            {trainingNames?.length === 0 ? 'Нет активных тренировок' : ''}
                        </Typography>
                    </div>
                    <Button
                        onClick={handleClose}
                        data-test-id='modal-create-training-button-close'
                        className={styles.close__icon}
                    >
                        <CloseIcon />
                    </Button>
                </div>
                {trainingNames?.length === 0 ? (
                    <Image
                        src='/empty-image.svg'
                        width={32}
                        preview={false}
                        className={styles.empty_img}
                    />
                ) : (
                    <div className={styles.container_trainings}>
                        <ul className={styles.list_trainings}>
                            {trainingNames?.map(({ name, isImplementation }, key) => (
                                <li
                                    key={name}
                                    className={classNames(
                                        styles.trainings_li,

                                        isImplementation ? styles.past__color : styles.trainings_li,
                                    )}
                                >
                                    <span>
                                        <Badge
                                            color={getCurrentColor(name)}
                                            style={{ marginRight: '8px' }}
                                        />
                                        {name}
                                    </span>
                                    <Button
                                        disabled={isImplementation}
                                        className={styles.btn__edit}
                                        data-test-id={`modal-update-training-edit-button${key}`}
                                    >
                                        {isImplementation ? (
                                            <EditFilled
                                                className={styles.past__color}
                                                onClick={() => handlePasteTraining(name)}
                                            />
                                        ) : (
                                            <EditOutlined
                                                className={styles.editOutlined}
                                                onClick={() => handleEditTraining(name)}
                                            />
                                        )}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <Divider />

                <Button
                    className={styles.modal__btn}
                    onClick={swapModal}
                    disabled={isDateBeforeOrEqualToday || trainingNames?.length === 5}
                >
                    Создать тренировку
                </Button>
            </div>
            <Drawerz
                showDrawer={open}
                setOpen={setOpen}
                dateMoment={dateMoment}
                selectedTraining={selectedTraining}
            />
        </React.Fragment>
    );
};
