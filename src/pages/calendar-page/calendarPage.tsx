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
import useWindowResize from '@hooks/useWindowResize';
import classNames from 'classnames';

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
    const { width } = useWindowResize();
    const isMobile = width <= 830;
    const [activeDate, setActiveDate] = useState('');
    const [activeDateMoment, setActiveDateMoment] = useState<Moment>();

    useEffect(() => {
        dispatch(actions.setIsMobile(isMobile));
    }, [isMobile]);

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
        dispatch(actions.setEditFlow(false));
        dispatch(actions.setPastFlow(false));
        dispatch(actions.setReadOnlyFlow(false));
        dispatch(actions.setIdKey(''));
    };

    const dateCellRender = (value: Moment) => {
        const dateValue = value.format('DD.MM.YYYY');

        return (
            <>
                <CalendarCell
                    tranings={tranings}
                    dateForBadge={value}
                    dateForModal={dateValue}
                    handleCloseModal={handleCloseModal}
                    activeDateModal={activeDateModal}
                />
            </>
        );
    };

    const dateFullCellMobileRender = (value: Moment) => {
        const date = value.format('DD.MM.YYYY');
        const dateForColorCell = value.format('YYYY-MM-DD');
        const isColorDate = tranings.some(
            (training) => training.date.toString().slice(0, 10) === dateForColorCell,
        );
        const isSelected = date === activeDate;
        const currentMonth = moment().month() === Number(activeDateMoment?.format('MM')) - 1;

        return (
            <div
                className={classNames(
                    isColorDate && styles.bluBackground,
                    isSelected && styles.select_cell,
                )}
            >
                {value.date()}
                {currentMonth && date === activeDateModal && (
                    <CalendarCell
                        tranings={tranings}
                        dateForBadge={value}
                        dateForModal={date}
                        handleCloseModal={handleCloseModal}
                        activeDateModal={activeDateModal}
                    />
                )}
            </div>
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
                            {isMobile ? '' : <p className={styles.button_text}>Настройки</p>}
                        </Button>
                    </div>

                    <div className={isMobile ? styles.mobile_wrapper : styles.wrapper_calendar}>
                        <Calendar
                            locale={Ru}
                            fullscreen={isMobile ? false : true}
                            className={isMobile ? styles.mobile_calendar : styles.calendar}
                            dateFullCellRender={isMobile ? dateFullCellMobileRender : undefined}
                            dateCellRender={dateCellRender}
                            onSelect={(value: Moment) => {
                                const stringValue = value.format('DD.MM.yyyy');

                                if (stringValue !== activeDateModal) {
                                    setActiveDate(stringValue);
                                    handleDateClick(stringValue);
                                    setActiveDateMoment(value);
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
