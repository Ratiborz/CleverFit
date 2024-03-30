import React, { useState } from 'react';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/calendar.slice';
import type { Moment } from 'moment';

import { ChooseTypeWorkout } from '../choose-type-workout/choose-type-workout';
import { ModalSaveError } from '../modal-save-error/modal-save-error';
import { TrainingList } from '../training-list/training-list';

type Props = {
    date: string;
    handleClose: () => void;
    isRightPosition: boolean;
    trainingNames: Array<{ name: string; isImplementation: boolean | undefined }>;
    dateMoment: Moment;
};

export const CreateTrainingModal = ({
    date,
    handleClose,
    isRightPosition,
    trainingNames,
    dateMoment,
}: Props) => {
    const dispatch = useAppDispatch();
    const [addExercises, setAddExercises] = useState(false);

    const swapModal = () => {
        dispatch(actions.setInputsData([]));
        dispatch(actions.setSelectedTraining(''));
        dispatch(actions.setEditFlow(false));
        dispatch(actions.setPastFlow(false));
        dispatch(actions.setReadOnlyFlow(false));
        setAddExercises(!addExercises);
    };

    return (
        <React.Fragment>
            {addExercises ? (
                <ChooseTypeWorkout
                    isRightPosition={isRightPosition}
                    trainingNames={trainingNames}
                    swapModal={swapModal}
                    dateMoment={dateMoment}
                />
            ) : (
                <TrainingList
                    isRightPosition={isRightPosition}
                    date={date}
                    trainingNames={trainingNames}
                    swapModal={swapModal}
                    handleClose={handleClose}
                    dateMoment={dateMoment}
                />
            )}

            <ModalSaveError handleClose={handleClose} />
        </React.Fragment>
    );
};
