import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
    CalendarTwoTone,
    HeartFilled,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyFilled,
} from '@ant-design/icons';
import Loader from '@components/loader/loader';
import { BadRequstModalError } from '@components/result/common-modal-result/bad-request-modal/bad-request-modal';
import { Paths } from '@constants/paths';
import { inviteListSelector } from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useLazyGetAllTrainingsQuery } from '@redux/api-rtk/training-requests';
import { history } from '@redux/configure-store';
import { actions as actionsCalendar } from '@redux/reducers/calendar.slice';
import { actions } from '@redux/reducers/common-modal.slice';
import { actions as actionsTraining } from '@redux/reducers/training.slice';
import type { MenuProps } from 'antd';
import { Button, Image, Layout, Menu } from 'antd';

import { getTrainingInfo } from '../../../api/calendar';

import 'antd/dist/antd.css';
import styles from './sider.module.scss';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

export const Aside: React.FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileWidth, setMobileWidth] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState('');
    const [getAllTrainings, { isSuccess, isError, data, isLoading }] =
        useLazyGetAllTrainingsQuery();
    const inviteList = useAppSelector(inviteListSelector);

    useEffect(() => {
        if (isSuccess) {
            dispatch(actionsTraining.setDataTraining(data));
            history.push(Paths.TRAINING);
        }
        if (isError) dispatch(actions.setWarning(true));
    }, [data, isSuccess, isError, dispatch]);

    const switchToChapter = (key: string) => {
        if (key === '1') {
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
                .finally(() => {
                    setLoading(false);
                });
        }

        if (key === '2') {
            getAllTrainings();
        }

        if (key === '4') {
            history.push(Paths.PROFILE);
        }
    };

    useEffect(() => {
        const currentRoute = location.pathname;

        if (currentRoute === '/calendar') setSelectedTab('1');
        if (currentRoute === '/training') setSelectedTab('2');
        if (currentRoute === '/profile') setSelectedTab('4');
    }, [location]);

    const items: MenuItem[] = [
        getItem('Календарь', '1', mobileWidth ? '' : <CalendarTwoTone twoToneColor='#10239E' />),
        getItem(
            <React.Fragment>
                Тренировки{' '}
                <span
                    className={styles.inviteCount}
                    data-test-id='notification-about-joint-training'
                >
                    {inviteList.length}
                </span>
            </React.Fragment>,
            '2',
            mobileWidth ? '' : <HeartFilled style={{ color: '#10239E' }} />,
        ),
        getItem(
            'Достижения',
            '3',
            mobileWidth ? '' : <TrophyFilled style={{ color: '#10239E' }} />,
        ),
        getItem('Профиль', '4', mobileWidth ? '' : <IdcardOutlined style={{ color: '#10239E' }} />),
    ];

    const exitFromAccount = () => {
        localStorage.clear();
        sessionStorage.clear();
        history.push(Paths.AUTH);
    };

    const goToMain = () => history.push(Paths.MAIN);

    return (
        <React.Fragment>
            {(loading || isLoading) && <Loader />}
            <BadRequstModalError />
            <Sider
                breakpoint='xs'
                onBreakpoint={(broken: boolean) => {
                    if (broken) {
                        setMobileWidth(true);
                    } else {
                        setMobileWidth(false);
                    }
                }}
                collapsedWidth={mobileWidth ? 1 : 60}
                className={styles.sider}
                data-test-id={mobileWidth ? 'sider-switch-mobile' : 'sider-switch'}
                trigger={null}
                width={mobileWidth ? 106 : 208}
                theme='light'
                collapsible={true}
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className={styles.wrapper}>
                    <div>
                        {collapsed ? (
                            <Image
                                className={styles.logo_mini}
                                preview={false}
                                width={mobileWidth ? 0 : 29}
                                onClick={goToMain}
                                src='/fit.svg'
                                alt='logo'
                            />
                        ) : (
                            <Image
                                className={styles.logo}
                                preview={false}
                                width={mobileWidth ? 72 : 133}
                                onClick={goToMain}
                                src='/Logo.svg'
                                alt='logo'
                            />
                        )}

                        <Menu
                            className={styles.menu}
                            style={{ overflow: 'hidden' }}
                            onClick={({ key }) => switchToChapter(key)}
                            theme='light'
                            selectedKeys={[selectedTab]}
                            mode='inline'
                            items={items}
                        />
                    </div>

                    <Button
                        className={styles.button}
                        onClick={() => exitFromAccount()}
                        icon={
                            mobileWidth ? (
                                ''
                            ) : (
                                <Image src='/Exit.svg' width={16} preview={false} alt='exit' />
                            )
                        }
                    >
                        {!collapsed && <span className={styles.button_text}>Выход</span>}
                    </Button>
                </div>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: `${styles.trigger} `,
                    onClick: () => setCollapsed(!collapsed),
                })}
            </Sider>
        </React.Fragment>
    );
};
