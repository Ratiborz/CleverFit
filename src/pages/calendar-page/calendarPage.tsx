import Loader from '@components/loader/loader';
import { backgroundImage } from '@constants/constants/constants';
import styles from './calendar.module.scss';
import { Aside } from '@components/main-page/sider/sider';
import { Calendar, ConfigProvider, Layout } from 'antd';
import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import { useGetTrainingListInfoQuery } from '@redux/api-rtk/calendarRequests';
import Ru from 'antd/es/calendar/locale/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';

moment.updateLocale('ru', {
    weekdaysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    monthsShort: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
    ],
    week: { dow: 1 },
});

export const CalendarPage: React.FC = () => {
    const { data, isLoading, isSuccess, isError } = useGetTrainingListInfoQuery();

    return (
        <>
            {isLoading && <Loader />}
            <Layout
                className={styles.general_wrapper}
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top',
                }}
            >
                <Aside />
                <Layout className={styles.main_container}>
                    <Breadcrumbs />
                    {isSuccess && <Calendar locale={Ru} className={styles.calendar} />}
                    {isError && <>error</>}
                </Layout>
            </Layout>
        </>
    );
};
