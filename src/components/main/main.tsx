import { CalendarTwoTone, HeartFilled, IdcardOutlined } from '@ant-design/icons';
import s from './main.module.scss';

import { Button, Card, Divider, Layout, Space } from 'antd';

export const Main = () => {
    return (
        <Layout className={s.wrapper}>
            <Card className={s.card}>
                <p className={s.card__text}>
                    С CleverFit ты сможешь: <br /> — планировать свои тренировки на календаре,
                    выбирая тип и уровень нагрузки; <br /> — отслеживать свои достижения в разделе
                    статистики, сравнивая свои результаты с нормами и рекордами; <br /> — создавать
                    свой профиль, где ты можешь загружать свои фото, видео и отзывы о тренировках;
                    <br /> — выполнять расписанные тренировки для разных частей тела, следуя
                    подробным инструкциям и советам профессиональных тренеров.
                </p>
            </Card>

            <Card className={`${s.card} ${s.card_margin}`} bodyStyle={{ width: 752 }}>
                <p className={s.card__descrip}>
                    CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не
                    откладывай на завтра — начни тренироваться уже сегодня!
                </p>
            </Card>

            <Space size={16}>
                <Card bodyStyle={{ padding: 0, width: 238 }}>
                    <p className={s.card_training__p}>Расписать тренировки</p>
                    <Divider style={{ margin: 0 }} />
                    <Button className={s.card_training__btn} type='link' icon={<HeartFilled />}>
                        Тренировки
                    </Button>
                </Card>

                <Card bodyStyle={{ padding: 0, width: 238 }}>
                    <p className={s.card_training__p}>Назначить календарь</p>
                    <Divider style={{ margin: 0 }} />
                    <Button
                        className={s.card_training__btn}
                        type='link'
                        icon={<CalendarTwoTone twoToneColor='#10239E' />}
                    >
                        Календарь
                    </Button>
                </Card>

                <Card bodyStyle={{ padding: 0, width: 238 }}>
                    <p className={s.card_training__p}>Заполнить профиль</p>
                    <Divider style={{ margin: 0 }} />
                    <Button className={s.card_training__btn} type='link' icon={<IdcardOutlined />}>
                        Профиль
                    </Button>
                </Card>
            </Space>
        </Layout>
    );
};
