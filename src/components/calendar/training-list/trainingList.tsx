import { EditOutlined } from '@ant-design/icons';
import { Badge, Button, Divider, Image, Typography } from 'antd';
import { CloseIcon } from '../../../assets/close-icon/closeIcon';
import styles from './trainingList.module.scss';
import { getCurrentColor } from '../choose-color-badge/chooseColorBadge';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/calendar.slice';
import { Training } from '../../../types/calendarTypes';
import type { Moment } from 'moment';

type Props = {
    isRightPosition: boolean;
    date: string;
    trainingNames: string[];
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

    const handleEditTraining = (name: string, dateMoment: Moment) => {
        swapModal();
        dispatch(actions.setSelectedTraining(name));

        const exercisesData = tranings.filter(
            (training) =>
                training.name === name &&
                dateMoment.toISOString().slice(0, 10) === training.date.slice(0, 10),
        );

        const updatedExercisesData = exercisesData[0].exercises.map((training) => ({
            name: training.name,
            replays: training.replays,
            weight: training.weight,
            count: training.approaches,
            date: dateMoment.format('DD.MM.YYYY'),
        }));
        console.log(updatedExercisesData);

        dispatch(actions.setInputsData(updatedExercisesData));
    };
    return (
        <div className={isRightPosition ? styles.modal_right : styles.modal}>
            <div className={styles.wrapper_header}>
                <div>
                    <h3 className={styles.modal__h3}>{`Тренировки на ${date}`}</h3>
                    <Typography className={styles.modal__descrip}>
                        {trainingNames.length === 0 ? 'Нет активных тренировок' : ''}
                    </Typography>
                </div>
                <div onClick={handleClose}>
                    <CloseIcon />
                </div>
            </div>
            {trainingNames.length === 0 ? (
                <Image
                    src='/empty-image.svg'
                    width={32}
                    preview={false}
                    className={styles.empty_img}
                />
            ) : (
                <div className={styles.container_trainings}>
                    <ul className={styles.list_trainings}>
                        {trainingNames?.map((name, key) => (
                            <li key={key} className={styles.trainings_li}>
                                <span>
                                    <Badge
                                        color={getCurrentColor(name)}
                                        style={{ marginRight: '8px' }}
                                    />
                                    {name}
                                </span>
                                <EditOutlined
                                    style={{ color: '#2B4ACBFF' }}
                                    onClick={() => handleEditTraining(name, dateMoment)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <Divider />

            <Button className={styles.modal__btn} onClick={swapModal}>
                {trainingNames.length === 0 ? 'Создать тренировку' : 'Добавить тренировку'}
            </Button>
        </div>
    );
};
