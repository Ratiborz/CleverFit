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
import { useLazyGetTrainingInfoQuery } from '@redux/api-rtk/calendarRequests';
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
    const [collapsed, setCollapsed] = useState(false);
    const [mobileWidth, setMobileWidth] = useState(false);
    const [trigger, result] = useLazyGetTrainingInfoQuery();

    const switchToCalendar = (key: string) => {
        if (key === '1') {
            trigger()
                .then((response) => console.log(response))
                .catch((error) => {
                    console.log(error);
                });
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

    return (
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
                            src='/fit.svg'
                            alt='logo'
                        />
                    ) : (
                        <Image
                            className={styles.logo}
                            preview={false}
                            width={mobileWidth ? 72 : 133}
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
    );
};
