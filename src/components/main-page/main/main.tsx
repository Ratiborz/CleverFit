import React, { useEffect, useState } from 'react';
import { CalendarTwoTone, HeartFilled, IdcardOutlined } from '@ant-design/icons';
import Loader from '@components/loader/loader';
import { Paths } from '@constants/paths';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useGetUserInfoQuery } from '@redux/api-rtk/profile-request';
import { useLazyGetAllTrainingsQuery } from '@redux/api-rtk/training-requests';
import { history } from '@redux/configure-store';
import { actions as actionsCalendar } from '@redux/reducers/calendar.slice';
import { actions } from '@redux/reducers/common-modal.slice';
import { actions as actionsRepRequest } from '@redux/reducers/repeat-requests.slice';
import { actions as actionsTraining } from '@redux/reducers/training.slice';
import { Button, Card, Divider, Layout } from 'antd';

import { getTrainingInfo } from '../../../api/calendar';

import styles from './main.module.scss';

export const Main = () => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const { data, refetch } = useGetUserInfoQuery();
    const [getAllTrainings, { isSuccess, isError, data: dataTraining, isLoading }] =
        useLazyGetAllTrainingsQuery();

    useEffect(() => {
        refetch();
        dispatch(actionsRepRequest.setUserInfo(data));
        console.log(data);
    }, [data, dispatch, refetch]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(actionsTraining.setDataTraining(dataTraining));
            history.push(Paths.TRAINING);
        }
        if (isError) dispatch(actions.setWarning(true));
    }, [dataTraining, isSuccess, isError, dispatch]);

    const switchToCalendar = () => {
        setLoading(true);
        getTrainingInfo()
            .then((response) => {
                dispatch(actionsCalendar.setTrainingData(response.data));
                history.push(Paths.CALENDAR);
            })
            .catch((error) => {
                console.log(error);
                dispatch(actions.setWarning(true));
            })
            .finally(() => setLoading(false));
    };

    const switchToTraining = () => getAllTrainings();

    const switchToProfile = () => {
        history.push(Paths.PROFILE);
    };

    return (
        <React.Fragment>
            {(loading || isLoading) && <Loader />}
            <Layout className={styles.wrapper}>
                <Card className={styles.card}>
                    <p className={styles.card__text}>
                        С CleverFit ты сможешь: <br /> — планировать свои тренировки на календаре,
                        выбирая тип и уровень нагрузки; <br /> — отслеживать свои достижения в
                        разделе статистики, сравнивая свои результаты с нормами и рекордами; <br />{' '}
                        — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы
                        о тренировках;
                        <br /> — выполнять расписанные тренировки для разных частей тела, следуя
                        подробным инструкциям и советам профессиональных тренеров.
                    </p>
                </Card>

                <Card className={`${styles.card} ${styles.card_margin}`}>
                    <p className={styles.card__descrip}>
                        CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса.
                        Не откладывай на завтра — начни тренироваться уже сегодня!
                    </p>
                </Card>

                <div className={styles.wrapper__card_mini}>
                    <Card bodyStyle={{ padding: 0 }} className={styles.card_mini}>
                        <p className={styles.card_training__p}>Расписать тренировки</p>
                        <Divider style={{ margin: 0 }} />
                        <Button
                            className={styles.card_training__btn}
                            type='link'
                            icon={<HeartFilled />}
                            onClick={() => switchToTraining()}
                        >
                            Тренировки
                        </Button>
                    </Card>

                    <Card bodyStyle={{ padding: 0 }} className={styles.card_mini}>
                        <p className={styles.card_training__p}>Назначить календарь</p>
                        <Divider style={{ margin: 0 }} />
                        <Button
                            data-test-id='menu-button-calendar'
                            className={styles.card_training__btn}
                            onClick={() => switchToCalendar()}
                            type='link'
                            icon={<CalendarTwoTone twoToneColor='#10239E' />}
                        >
                            Календарь
                        </Button>
                    </Card>

                    <Card bodyStyle={{ padding: 0 }} className={styles.card_mini}>
                        <p className={styles.card_training__p}>Заполнить профиль</p>
                        <Divider style={{ margin: 0 }} />
                        <Button
                            data-test-id='menu-button-profile'
                            className={styles.card_training__btn}
                            type='link'
                            icon={<IdcardOutlined />}
                            onClick={() => switchToProfile()}
                        >
                            Профиль
                        </Button>
                    </Card>
                </div>
            </Layout>
        </React.Fragment>
    );
};
