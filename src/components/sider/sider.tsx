import {
    CalendarTwoTone,
    HeartFilled,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyFilled,
} from '@ant-design/icons';
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

const items: MenuItem[] = [
    getItem('Календарь', '1', <CalendarTwoTone twoToneColor='#10239E' />),
    getItem('Тренировки', '2', <HeartFilled style={{ color: '#10239E' }} />),
    getItem('Достижения', '3', <TrophyFilled style={{ color: '#10239E' }} />),
    getItem('Профиль', '4', <IdcardOutlined style={{ color: '#10239E' }} />),
];

export const Aside: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [modileWidth, setMobileWidth] = useState(false);

    return (
        <Sider
            breakpoint='xs'
            onBreakpoint={(broken) => {
                if (broken) {
                    setMobileWidth(true);
                } else {
                    setMobileWidth(false); // Сбросить mobileWidth в false при отсутствии брейкпоинта
                }
            }}
            collapsedWidth={modileWidth ? 0 : 60}
            className={s.sider}
            data-test-id='sider-switch'
            trigger={null}
            width={modileWidth ? 106 : 208}
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
                            width={29}
                            src='/fit.svg'
                            alt='logo'
                        />
                    ) : (
                        <Image
                            className={s.logo}
                            preview={false}
                            width={133}
                            src='/Logo.svg'
                            alt='logo'
                        />
                    )}

                    <Menu theme='light' defaultSelectedKeys={['1']} mode='inline' items={items} />
                </div>

                <Button
                    className={s.button}
                    icon={
                        modileWidth ? (
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
