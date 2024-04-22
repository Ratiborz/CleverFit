import React, { useEffect, useState } from 'react';
import Loader from '@components/loader/loader';
import { requestTrainingListSelector, trainingsDataSelector } from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    useGetTrainingPalsQuery,
    useLazyGetUsersJointListQuery,
} from '@redux/api-rtk/training-requests';
import { actions as actionsCommon } from '@redux/reducers/common-modal.slice';
import { actions } from '@redux/reducers/training.slice';
import { getPopularTypeTraining } from '@utils/get-popular-training';
import { Button, Divider } from 'antd';

import styles from './common-trainings.module.scss';

export const CommonTrainings = () => {
    const dispatch = useAppDispatch();
    const { data: dataPals } = useGetTrainingPalsQuery();
    const repeatRequest = useAppSelector(requestTrainingListSelector);
    const trainingData = useAppSelector(trainingsDataSelector);
    const [idTypeTraining, setIdTypeTraining] = useState();
    const [getUsersJointList, { data, isLoading, isSuccess, isError }] =
        useLazyGetUsersJointListQuery();

    const chooseByMyTraining = () => {
        const favouriteTypeTraining = getPopularTypeTraining(trainingData);
        setIdTypeTraining(favouriteTypeTraining?.id);
        console.log(favouriteTypeTraining);
        getUsersJointList({ trainingType: favouriteTypeTraining?.type });
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(actions.setRandomChoiceState(true));
            dispatch(actions.setDataTrainingPals({ data, idTypeTraining }));
        }
        if (repeatRequest) {
            getUsersJointList({});
            dispatch(actions.setRepeatRequest(false));
        }
        if (isError) dispatch(actionsCommon.setErrorWithOpen(true));
    }, [dispatch, getUsersJointList, repeatRequest, isSuccess, isError, data, idTypeTraining]);

    const randomUser = () => {
        getUsersJointList({});
    };

    return (
        <React.Fragment>
            {isLoading && <Loader />}
            <div className={styles.container}>
                <h2 className={styles.container__title}>
                    Хочешь тренироваться с тем, кто разделяет твои цели и темп?
                    <br /> Можешь найти друга для совместных тренировок среди других пользователей.
                </h2>
                <p className={styles.container__descrip}>
                    Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой
                    уровень и вид тренировки, и мы найдем тебе идеального спортивного друга.
                </p>
                <Divider />
                <div className={styles.wrapper__btn}>
                    <Button className={styles.btn__random} type='link' onClick={() => randomUser()}>
                        Случайный выбор
                    </Button>
                    <Button
                        className={styles.btn__choose_friend}
                        type='link'
                        onClick={() => chooseByMyTraining()}
                    >
                        Выбор друга по моим видам тренировок
                    </Button>
                </div>
            </div>
            <div>
                <h2>Мои партнёры по тренировкам</h2>
                <p className={styles.no_partners__descrip}>
                    У вас пока нет партнёров для совместных тренировок
                </p>
            </div>
        </React.Fragment>
    );
};
