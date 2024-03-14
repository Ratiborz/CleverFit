import { Button, Divider, Image, Select, Spin } from 'antd';
import { ArrowBack } from '../../../assets/arrow-back/arrowBack';
import styles from './chooseTypeWorkout.module.scss';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { inputsDataSelector, trainingsListSelector } from '@constants/selectors';
import { useEffect, useState } from 'react';
import type { Moment } from 'moment';
import { Drawerz } from '../drawer/drawer';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { useCreateTrainingMutation } from '@redux/api-rtk/calendarRequests';
import { selectedTrainingSelector } from '@constants/selectors/selectors';
import { actions } from '@redux/reducers/calendar.slice';
import { getTrainingInfo } from '../../../api/calendar';

type Props = {
    swapModal: () => void;
    isRightPosition: boolean;
    trainingNames: string[];
    dateMoment: Moment;
};

export const ChooseTypeWorkout = ({
    isRightPosition,
    trainingNames,
    swapModal,
    dateMoment,
}: Props) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const selectedTraining = useAppSelector(selectedTrainingSelector);
    const inputsData = useAppSelector(inputsDataSelector);
    const trainingsList = useAppSelector(trainingsListSelector);
    const [createTraining, { isLoading, isSuccess, isError }] = useCreateTrainingMutation();

    useEffect(() => {
        if (isSuccess) {
            swapModal();
            getTrainingInfo()
                .then((response) => {
                    dispatch(actions.setTrainingData(response.data));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (isError) {
            dispatch(actions.setModalError(isError));
        }
    }, [isSuccess, isError]);

    const currentTrainingForSelect = trainingsList.filter(
        (trainingItem) => !trainingNames.includes(trainingItem.name),
    );

    const currentTime = dateMoment.format('DD.MM.YYYY') === inputsData[0]?.date;

    const saveExercises = () => {
        const training = {
            name: selectedTraining,
            date: dateMoment.toISOString(),
            exercises: inputsData.map((input) => {
                return {
                    name: input.name,
                    replays: input.replays,
                    weight: input.weight,
                    approaches: input.count,
                    isImplementation: false,
                };
            }),
        };
        createTraining(training);
    };

    return (
        <>
            <div
                className={classNames(
                    styles.wrapper__add_exercises,
                    isRightPosition ? styles.right_position : styles.left_position,
                )}
            >
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div style={{ height: 16 }} onClick={swapModal}>
                            <ArrowBack />
                        </div>
                        <Select
                            style={{ width: 220 }}
                            value={selectedTraining ? selectedTraining : 'Выбор типа тренировки'}
                            onSelect={(training) => dispatch(actions.setSelectedTraining(training))}
                            bordered={false}
                            options={currentTrainingForSelect?.map(({ name }) => ({
                                value: name,
                                label: name,
                            }))}
                        />
                    </div>
                    <Divider className={styles.divider_top} />
                </div>
                {currentTime ? (
                    <div className={styles.container__exercises}>
                        {inputsData.map((item, index) => (
                            <div key={index} className={styles.exercise}>
                                <p>{item.name}</p>
                                <div className={styles.change} onClick={() => setOpen(true)}>
                                    <EditOutlined style={{ color: '#2F54EB' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Image
                        src='/empty-image.svg'
                        width={32}
                        preview={false}
                        className={styles.empty_img}
                    />
                )}
                <div className={styles.buttons}>
                    <Divider className={styles.divider_bottom} />
                    <Button
                        className={styles.addExecsise_btn}
                        disabled={selectedTraining ? false : true}
                        onClick={() => setOpen(true)}
                    >
                        Добавить упражнения
                    </Button>
                    <Button
                        className={styles.add__training_btn}
                        type='link'
                        disabled={currentTime ? false : true}
                        onClick={() => saveExercises()}
                    >
                        {isLoading && (
                            <Spin
                                indicator={
                                    <LoadingOutlined
                                        style={{ fontSize: 14, marginRight: 8, color: '#2F54EBFF' }}
                                        spin
                                    />
                                }
                            />
                        )}
                        Сохранить
                    </Button>
                </div>
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
