import { CalendarTwoTone, HeartFilled, IdcardOutlined } from '@ant-design/icons';
import styles from './main.module.scss';

import { Button, Card, Divider, Layout } from 'antd';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { useState } from 'react';
import Loader from '@components/loader/loader';
import { getTrainingInfo } from '../../../api/calendar';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/commonModal.slice';
import { actions as actionsCalendar } from '@redux/reducers/calendar.slice';

export const Main = () => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

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

    return (
        <>
            {loading && <Loader />}
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
                            className={styles.card_training__btn}
                            type='link'
                            icon={<IdcardOutlined />}
                        >
                            Профиль
                        </Button>
                    </Card>
                </div>
            </Layout>
        </>
    );
};
