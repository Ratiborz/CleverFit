import React, { useEffect, useState } from 'react';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import {
    editFlowSelector,
    idKeySelector,
    inputsDataSelector,
    isMobileSelector,
    pastFlowSelector,
    selectedTrainingSelector,
    trainingsListSelector,
} from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    useCreateTrainingMutation,
    useEditTrainingMutation,
} from '@redux/api-rtk/calendar-requests';
import { actions } from '@redux/reducers/calendar.slice';
import { Button, Divider, Image, Select, Spin } from 'antd';
import classNames from 'classnames';
import type { Moment } from 'moment';

import { getTrainingInfo } from '../../../api/calendar';
import { ArrowBack } from '../../../assets/arrow-back/arrow-back';
import { Drawerz } from '../drawer/drawer';

import styles from './choose-type-workout.module.scss';

type Props = {
    swapModal: () => void;
    isRightPosition: boolean;
    trainingNames: Array<{ name: string; isImplementation: boolean | undefined }>;
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
    }, [isSuccess, isError, editIsSuccess, editIsError, swapModal, dispatch]);

    const saveExercises = () => {
        const currentIndex = inputsData[0]?.id || idKey;
        const training = {
            name: selectedTraining,
            date: dateMoment.toISOString(),
            isImplementation: !!pastFlow,
            exercises: inputsData.map((input) => ({
                name: input.name,
                replays: input.replays,
                weight: input.weight,
                approaches: input.count,
                isImplementation: !!pastFlow,
                id: input.id,
            })),
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

    const currentTime =
        inputsData[0]?.date && dateMoment.format('DD.MM.YYYY') === inputsData[0].date;

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

    const classModal = {
        true: styles.mobile,
        false: isRightPosition ? styles.right_position : styles.left_position,
    };

    return (
        <React.Fragment>
            <div
                data-test-id='modal-create-exercise'
                className={classNames(
                    styles.wrapper__add_exercises,
                    isMobile ? classModal.true : classModal.false,
                )}
            >
                <div className={styles.container}>
                    <div className={styles.header}>
                        <Button
                            style={{ height: 16 }}
                            className={styles.button__back}
                            onClick={swapModal}
                            data-test-id='modal-exercise-training-button-close'
                        >
                            <ArrowBack />
                        </Button>
                        <Select
                            data-test-id='modal-create-exercise-select'
                            style={{ width: 220 }}
                            value={selectedTraining || 'Выбор типа тренировки'}
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
                            <div key={item.name} className={styles.exercise}>
                                <p>{item.name}</p>
                                <Button
                                    className={styles.change}
                                    onClick={() => openDrawer()}
                                    data-test-id={`modal-update-training-edit-button${index}`}
                                >
                                    <EditOutlined style={{ color: '#2F54EB' }} />
                                </Button>
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
                        disabled={!selectedTraining}
                        onClick={() => setOpen(true)}
                    >
                        Добавить упражнения
                    </Button>
                    <Button
                        className={styles.add__training_btn}
                        type='link'
                        disabled={!(currentTime || editFlow)}
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
                                            spin={true}
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
        </React.Fragment>
    );
};
