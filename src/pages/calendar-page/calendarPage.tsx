import Loader from '@components/loader/loader';
import { positionImage } from '@constants/constants/constants';
import styles from './calendar.module.scss';
import { Aside } from '@components/main-page/sider/sider';
import { Button, Calendar, Layout } from 'antd';
import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import { useGetTrainingListInfoQuery } from '@redux/api-rtk/calendarRequests';
import Ru from 'antd/es/calendar/locale/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';
import { SettingOutlined } from '@ant-design/icons';
import { WithOpenError } from '@components/result/calendar-modal-result/with-open-error/withOpenError';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { actions } from '@redux/reducers/calendar.slice';
import { trainingDataSelector, trainingListRepeatSelector } from '@constants/selectors';
import type { Moment } from 'moment';
import { CalendarCell } from '@components/calendar/calendar-cell/calendarCell';

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
    const dispatch = useAppDispatch();
    const repeatRequest = useAppSelector(trainingListRepeatSelector);
    const { isLoading, isError, isSuccess, refetch, data } = useGetTrainingListInfoQuery();
    const [activeDateModal, setActiveDateModal] = useState('');
    const tranings = useAppSelector(trainingDataSelector);

    useEffect(() => {
        if (isSuccess) {
            dispatch(actions.setTrainingsList(data));
        }
        if (isError) {
            dispatch(actions.setErrorWithOpen(isError));
        }
        if (repeatRequest) {
            refetch();
            dispatch(actions.setRepeatRequest(false));
        }
    }, [isError, repeatRequest, isSuccess]);

    const handleDateClick = (date: string) => {
        setActiveDateModal(date);
    };

    const handleCloseModal = () => {
        setActiveDateModal('');
    };

    const dateCellRender = (value: Moment) => {
        const dateValue = value.format('DD.MM.yyyy');

        return (
            <CalendarCell
                tranings={tranings}
                dateForBadge={value}
                dateForModal={dateValue}
                handleCloseModal={handleCloseModal}
                activeDateModal={activeDateModal}
            />
        );
    };

    return (
        <>
            {isLoading && <Loader />}
            <Layout className={styles.general_wrapper} style={positionImage}>
                <Aside />
                <Layout className={styles.main_container}>
                    <Breadcrumbs />
                    <div className={styles.wrapper_btn}>
                        <Button
                            className={styles.settings_btn}
                            type='link'
                            icon={<SettingOutlined style={{ color: '#000000D9' }} />}
                            style={{ padding: 0 }}
                        >
                            <p className={styles.button_text}>Настройки</p>
                        </Button>
                    </div>

                    <div className={styles.wrapper_calendar}>
                        <Calendar
                            locale={Ru}
                            className={styles.calendar}
                            dateCellRender={dateCellRender}
                            onSelect={(value: Moment) => {
                                const stringValue = value.format('DD.MM.yyyy');

                                if (stringValue !== activeDateModal) {
                                    handleDateClick(stringValue);
                                }
                            }}
                        />
                    </div>
                </Layout>
            </Layout>

            <WithOpenError />
        </>
    );
};
