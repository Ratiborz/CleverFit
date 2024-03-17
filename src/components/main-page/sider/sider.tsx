import {
    CalendarTwoTone,
    HeartFilled,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyFilled,
} from '@ant-design/icons';
import { history } from '@redux/configure-store';
import type { MenuProps } from 'antd';
import { Button, Image, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import styles from './sider.module.scss';
import { Paths } from '@constants/paths';
import Loader from '@components/loader/loader';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { getTrainingInfo } from '../../../api/calendar';
import { BadRequstModalError } from '@components/result/common-modal-result/badRequestModal/badRequstModal';
import { actions as actionsCalendar } from '@redux/reducers/calendar.slice';
import { actions } from '@redux/reducers/commonModal.slice';
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
    const dispatch = useAppDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileWidth, setMobileWidth] = useState(false);
    const [loading, setLoading] = useState(false);

    const switchToCalendar = (key: string) => {
        if (key === '1') {
            setLoading(true);
            getTrainingInfo()
                .then((response) => {
                    dispatch(actionsCalendar.setTrainingData(response.data));
                    console.log(response.data);
                    history.push(Paths.CALENDAR);
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(actions.setWarning(true));
                })
                .finally(() => setLoading(false));
        }
    };

    const items: MenuItem[] = [
        getItem('Календарь', '1', mobileWidth ? '' : <CalendarTwoTone twoToneColor='#10239E' />),
        getItem('Тренировки', '2', mobileWidth ? '' : <HeartFilled style={{ color: '#10239E' }} />),
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

    const goToMain = () => {
        history.push(Paths.MAIN);
    };

    return (
        <>
            {loading && <Loader />}
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
                collapsible
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
                            onClick={({ key }) => switchToCalendar(key)}
                            theme='light'
                            defaultSelectedKeys={['1']}
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
        </>
    );
};
