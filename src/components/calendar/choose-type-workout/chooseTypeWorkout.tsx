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
import {
    useCreateTrainingMutation,
    useEditTrainingMutation,
} from '@redux/api-rtk/calendarRequests';
import {
    editFlowSelector,
    idKeySelector,
    isMobileSelector,
    pastFlowSelector,
    selectedTrainingSelector,
} from '@constants/selectors/selectors';
import { actions } from '@redux/reducers/calendar.slice';
import { getTrainingInfo } from '../../../api/calendar';
import { Training } from '../../../types/calendarTypes';

type Props = {
    swapModal: () => void;
    isRightPosition: boolean;
    trainingNames: { name: string; isImplementation: boolean | undefined }[];
    dateMoment: Moment;
    tranings: Training[];
};

export const ChooseTypeWorkout = ({
    isRightPosition,
    trainingNames,
    swapModal,
    dateMoment,
    tranings,
}: Props) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const selectedTraining = useAppSelector(selectedTrainingSelector);
    const inputsData = useAppSelector(inputsDataSelector);
    const trainingsList = useAppSelector(trainingsListSelector);
    const editFlow = useAppSelector(editFlowSelector);
    const pastFlow = useAppSelector(pastFlowSelector);
    const idKey = useAppSelector(idKeySelector);
    const [createTraining, { isLoading, isSuccess, isError }] = useCreateTrainingMutation();
    const [
        editTraining,
        { isSuccess: editIsSuccess, isError: editIsError, isLoading: editIsLoading },
    ] = useEditTrainingMutation();
    const isMobile = useAppSelector(isMobileSelector);

    useEffect(() => {
        if (isSuccess || editIsSuccess) {
            swapModal();
            getTrainingInfo()
                .then((response) => {
                    dispatch(actions.setTrainingData(response.data));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (isError || editIsError) {
            dispatch(actions.setModalError(true));
        }
    }, [isSuccess, isError, editIsSuccess, editIsError]);

    const saveExercises = () => {
        const currentIndex = inputsData[0]?.id || idKey;
        const training = {
            name: selectedTraining,
            date: dateMoment.toISOString(),
            isImplementation: pastFlow ? true : false,
            exercises: inputsData.map((input) => {
                return {
                    name: input.name,
                    replays: input.replays,
                    weight: input.weight,
                    approaches: input.count,
                    isImplementation: pastFlow ? true : false,
                    id: input.id,
                };
            }),
        };

        if (editFlow || pastFlow) {
            editTraining({ id: currentIndex, training });
        } else {
            createTraining(training);
        }
    };

    const selectProcess = (training: string) => {
        dispatch(actions.setSelectedTraining(training));
        dispatch(actions.setEditFlow(false));
        dispatch(actions.setInputsData([]));
    };

    const currentTime = dateMoment.format('DD.MM.YYYY') === inputsData[0]?.date;

    const newTrainingNames = trainingNames
        .filter((item) => !item.isImplementation)
        .map((item) => item.name);

    const currentTrainingForSelect = trainingsList.filter(
        (trainingItem) => !newTrainingNames.includes(trainingItem.name),
    );
    const currentTrainingInPast = trainingsList.filter((trainingItem) =>
        newTrainingNames.includes(trainingItem.name),
    );

    const openDrawer = () => {
        const currentIndex = inputsData[0].id;
        dispatch(actions.setEditFlow(true));
        dispatch(actions.setIdKey(currentIndex));
        setOpen(true);
    };

    return (
        <>
            <div
                data-test-id='modal-create-exercise'
                className={classNames(
                    styles.wrapper__add_exercises,
                    isMobile
                        ? styles.mobile
                        : isRightPosition
                        ? styles.right_position
                        : styles.left_position,
                )}
            >
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div
                            style={{ height: 16 }}
                            onClick={swapModal}
                            data-test-id='modal-exercise-training-button-close'
                        >
                            <ArrowBack />
                        </div>
                        <Select
                            data-test-id='modal-create-exercise-select'
                            style={{ width: 220 }}
                            value={selectedTraining ? selectedTraining : 'Выбор типа тренировки'}
                            onSelect={(training) => selectProcess(training)}
                            bordered={false}
                            options={(pastFlow
                                ? currentTrainingInPast
                                : currentTrainingForSelect
                            ).map(({ name }) => ({
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
                                <div className={styles.change} onClick={() => openDrawer()}>
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
                        disabled={currentTime || editFlow ? false : true}
                        onClick={() => saveExercises()}
                    >
                        {isLoading ||
                            (editIsLoading && (
                                <Spin
                                    indicator={
                                        <LoadingOutlined
                                            style={{
                                                fontSize: 14,
                                                marginRight: 8,
                                                color: '#2F54EBFF',
                                            }}
                                            spin
                                        />
                                    }
                                />
                            ))}
                        {pastFlow ? 'Сохранить изменения' : 'Сохранить'}
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
