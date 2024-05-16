import React, { useEffect, useState } from 'react';
import Loader from '@components/loader/loader';
import {
    inviteListSelector,
    requestTrainingListSelector,
    trainingsDataSelector,
    usersTrainingPalsSelector,
} from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useGetInvitesQuery } from '@redux/api-rtk/invite-requests';
import {
    useGetTrainingPalsQuery,
    useLazyGetUsersJointListQuery,
} from '@redux/api-rtk/training-requests';
import { actions as actionsCommon } from '@redux/reducers/common-modal.slice';
import { actions } from '@redux/reducers/training.slice';
import { getPopularTypeTraining } from '@utils/get-popular-training';
import { Button, Divider } from 'antd';

import { Training } from '../../../types/calendar-types';

import { InvitationTraining } from './invitation-training/invitation-training';
import { PartnersCards } from './partners-cards/partners-cards';

import styles from './common-trainings.module.scss';

export const CommonTrainings = () => {
    const dispatch = useAppDispatch();
    const { status } = useGetInvitesQuery();
    const { currentData } = useGetTrainingPalsQuery();
    const repeatRequest = useAppSelector(requestTrainingListSelector);
    const trainingData = useAppSelector(trainingsDataSelector);
    const [idTypeTraining, setIdTypeTraining] = useState<string | undefined>();
    const [dataInputs, setDataInputs] = useState<Training>();
    const [getUsersJointList, { data, isLoading, isSuccess, isError }] =
        useLazyGetUsersJointListQuery();
    const inviteList = useAppSelector(inviteListSelector);
    const usersTrainingPals = useAppSelector(usersTrainingPalsSelector);
    const [listPartners, setListPartners] = useState(false);

    const chooseByMyTraining = () => {
        const favouriteTypeTraining = getPopularTypeTraining(trainingData);

        setIdTypeTraining(favouriteTypeTraining?.id);
        setDataInputs(favouriteTypeTraining?.data);

        console.log(favouriteTypeTraining);

        getUsersJointList({ trainingType: favouriteTypeTraining?.type });
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(actions.setRandomChoiceState(true));
            dispatch(actions.setDataTrainingPals({ data, idTypeTraining, dataInputs }));
        }
        if (repeatRequest) {
            getUsersJointList({});
            dispatch(actions.setRepeatRequest(false));
        }
        if (isError) dispatch(actionsCommon.setErrorWithOpen(true));
    }, [
        dispatch,
        getUsersJointList,
        repeatRequest,
        isSuccess,
        isError,
        data,
        idTypeTraining,
        dataInputs,
    ]);

    const randomUser = () => {
        getUsersJointList({});
    };

    return (
        <React.Fragment>
            {isLoading && <Loader />}
            {!listPartners && inviteList?.length > 0 && (
                <InvitationTraining setListPartners={setListPartners} />
            )}
            {!listPartners && (
                <div className={styles.container}>
                    <h2 className={styles.container__title}>
                        Хочешь тренироваться с тем, кто разделяет твои цели и темп?
                        <br /> Можешь найти друга для совместных тренировок среди других
                        пользователей.
                    </h2>
                    <p className={styles.container__descrip}>
                        Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой
                        уровень и вид тренировки, и мы найдем тебе идеального спортивного друга.
                    </p>
                    <Divider />
                    <div className={styles.wrapper__btn}>
                        <Button
                            className={styles.btn__random}
                            type='link'
                            onClick={() => randomUser()}
                        >
                            Случайный выбор
                        </Button>
                        <Button
                            className={styles.btn__choose_friend}
                            type='link'
                            onClick={() => chooseByMyTraining()}
                        >
                            Выбор друга по моим тренировкам
                        </Button>
                    </div>
                </div>
            )}
            <div className={styles.container_partners}>
                <h2>Мои партнёры по тренировкам</h2>
                {usersTrainingPals.length > 0 ? (
                    <PartnersCards setListPartners={setListPartners} />
                ) : (
                    <p className={styles.no_partners__descrip}>
                        У вас пока нет партнёров для совместных тренировок
                    </p>
                )}
            </div>
        </React.Fragment>
    );
};
