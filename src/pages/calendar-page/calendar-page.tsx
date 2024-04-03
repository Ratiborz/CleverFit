import React, { useEffect, useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import { CalendarCell } from '@components/calendar/calendar-cell/calendar-cell';
import Loader from '@components/loader/loader';
import { Aside } from '@components/main-page/sider/sider';
import { WithOpenError } from '@components/result/common-modal-result/with-open-error/with-open-error';
import { positionImage } from '@constants/constants/constants';
import { trainingDataSelector, trainingListRepeatSelector } from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import useWindowResize from '@hooks/use-window-resize';
import { useGetTrainingListInfoQuery } from '@redux/api-rtk/calendar-requests';
import { actions } from '@redux/reducers/calendar.slice';
import { actions as commonModal } from '@redux/reducers/common-modal.slice';
import { Button, Calendar, Layout } from 'antd';
import Ru from 'antd/es/calendar/locale/ru_RU';
import classNames from 'classnames';
import type { Moment } from 'moment';
import moment from 'moment';

import styles from './calendar-page.module.scss';

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
    }, [isMobile, dispatch]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(actions.setTrainingsList(data));
        }
        if (isError) {
            dispatch(commonModal.setErrorWithOpen(isError));
        }
        if (repeatRequest) {
            refetch();
            dispatch(actions.setRepeatRequest(false));
        }
    }, [isError, repeatRequest, isSuccess, data, dispatch, refetch]);

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
            <CalendarCell
                tranings={tranings}
                dateForBadge={value}
                dateForModal={dateValue}
                handleCloseModal={handleCloseModal}
                activeDateModal={activeDateModal}
            />
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
        <React.Fragment>
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
                            fullscreen={!isMobile}
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
        </React.Fragment>
    );
};
