import { EditFilled, EditOutlined } from '@ant-design/icons';
import { Badge, Button, Divider, Image, Typography } from 'antd';
import { CloseIcon } from '../../../assets/close-icon/closeIcon';
import styles from './trainingList.module.scss';
import { getCurrentColor } from '../choose-color-badge/chooseColorBadge';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/calendar.slice';
import { Training } from '../../../types/calendarTypes';
import type { Moment } from 'moment';
import moment from 'moment';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Drawerz } from '../drawer/drawer';
import { isMobileSelector, selectedTrainingSelector } from '@constants/selectors';
import useWindowResize from '@hooks/useWindowResize';

type Props = {
    isRightPosition: boolean;
    date: string;
    trainingNames: { name: string; isImplementation: boolean | undefined }[];
    swapModal: () => void;
    handleClose: () => void;
    tranings: Training[];
    dateMoment: Moment;
};

export const TrainingList = ({
    isRightPosition,
    date,
    trainingNames,
    swapModal,
    handleClose,
    tranings,
    dateMoment,
}: Props) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const selectedTraining = useAppSelector(selectedTrainingSelector);
    const mirrorDate = (dateString: string) =>
        dateString.split('-').reverse().join('.').replace(/-/g, '.');
    const today = moment().format('DD.MM.YYYY');
    const isMobile = useAppSelector(isMobileSelector);

    const isDateBeforeOrEqualToday = moment(date, 'DD.MM.YYYY').isSameOrBefore(
        moment(today, 'DD.MM.YYYY'),
        'day',
    );

    useEffect(() => {
        dispatch(actions.setPastFlow(isDateBeforeOrEqualToday));
    }, [isDateBeforeOrEqualToday]);

    const handleEditTraining = (name: string) => {
        swapModal();
        if (isDateBeforeOrEqualToday) {
            dispatch(actions.setPastFlow(true));
        }
        dispatch(actions.setEditFlow(true));
        dispatch(actions.setSelectedTraining(name));
        const exercisesData = tranings.filter(
            (training) => training.name === name && date === mirrorDate(training.date.slice(0, 10)),
        );
        const idTraining = exercisesData[0]._id;

        const updatedExercisesData = exercisesData[0].exercises.map((training) => ({
            name: training.name,
            replays: training.replays,
            weight: training.weight,
            count: training.approaches,
            date: date,
            id: idTraining,
        }));

        dispatch(actions.setInputsData(updatedExercisesData));
    };

    const handlePasteTraining = (name: string) => {
        const exercisesData = tranings.filter(
            (training) => training.name === name && date === mirrorDate(training.date.slice(0, 10)),
        );

        const idTraining = exercisesData[0]._id;

        const updatedExercisesData = exercisesData[0].exercises.map((training) => ({
            name: training.name,
            replays: training.replays,
            weight: training.weight,
            count: training.approaches,
            date: date,
            id: idTraining,
        }));
        dispatch(actions.setPastFlow(true));
        dispatch(actions.setReadOnlyFlow(true));
        dispatch(actions.setEditFlow(false));
        dispatch(actions.setInputsData(updatedExercisesData));
        dispatch(actions.setSelectedTraining(name));
        setOpen(true);
    };

    return (
        <>
            <div
                data-test-id='modal-create-training'
                className={
                    isMobile ? styles.mobile : isRightPosition ? styles.modal_right : styles.modal
                }
            >
                <div className={styles.wrapper_header}>
                    <div>
                        <h3 className={styles.modal__h3}>{`Тренировки на ${date}`}</h3>
                        <Typography className={styles.modal__descrip}>
                            {trainingNames?.length === 0 ? 'Нет активных тренировок' : ''}
                        </Typography>
                    </div>
                    <div onClick={handleClose} data-test-id='modal-create-training-button-close'>
                        <CloseIcon />
                    </div>
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
                                    key={key}
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
        </>
    );
};
