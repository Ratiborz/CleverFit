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
import s from './sider.module.scss';
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
        history.push('/auth');
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
            className={s.sider}
            data-test-id={mobileWidth ? 'sider-switch-mobile' : 'sider-switch'}
            trigger={null}
            width={mobileWidth ? 106 : 208}
            theme='light'
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
        >
            <div className={s.wrapper}>
                <div>
                    {collapsed ? (
                        <Image
                            className={s.logo_mini}
                            preview={false}
                            width={mobileWidth ? 0 : 29}
                            src='/fit.svg'
                            alt='logo'
                        />
                    ) : (
                        <Image
                            className={s.logo}
                            preview={false}
                            width={mobileWidth ? 72 : 133}
                            src='/Logo.svg'
                            alt='logo'
                        />
                    )}

                    <Menu
                        className={s.menu}
                        style={{ overflow: 'hidden' }}
                        theme='light'
                        defaultSelectedKeys={['1']}
                        mode='inline'
                        items={items}
                    />
                </div>

                <Button
                    className={s.button}
                    onClick={() => exitFromAccount()}
                    icon={
                        mobileWidth ? (
                            ''
                        ) : (
                            <Image src='/Exit.svg' width={16} preview={false} alt='exit' />
                        )
                    }
                >
                    {!collapsed && <span className={s.button_text}>Выход</span>}
                </Button>
            </div>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: `${s.trigger} `,
                onClick: () => setCollapsed(!collapsed),
            })}
        </Sider>
    );
};
