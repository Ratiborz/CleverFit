import styles from './createTrainingModal.module.scss';
import { useState } from 'react';
import { ChooseTypeWorkout } from '../choose-type-workout/chooseTypeWorkout';
import { TrainingList } from '../training-list/trainingList';
import type { Moment } from 'moment';

type Props = {
    date: string;
    handleClose: () => void;
    isRightPosition: boolean;
    trainingNames: string[];
    dateMoment: Moment;
};

export const CreateTrainingModal = ({
    date,
    handleClose,
    isRightPosition,
    trainingNames,
    dateMoment,
}: Props) => {
    const [addExercises, setAddExercises] = useState(false);

    const swapModal = () => {
        setAddExercises(!addExercises);
    };

    return (
        <>
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
                />
            )}
        </>
    );
};
