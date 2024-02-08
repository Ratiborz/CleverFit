import {
    CalendarTwoTone,
    HeartFilled,
    IdcardTwoTone,
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
    getItem('Календарь', '1', <CalendarTwoTone />),
    getItem('Тренировки', '2', <HeartFilled />),
    getItem('Достижения', '3', <TrophyFilled />),
    getItem('Профиль', '4', <IdcardTwoTone />),
];

const Aside: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout>
            <Sider
                className={s.sider}
                trigger={null}
                width={208}
                theme='light'
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className={s.wrapper}>
                    <div>
                        <Image
                            className={s.logo}
                            preview={false}
                            width={133}
                            src='/public/Logo.svg'
                            alt='logo'
                        />

                        <Menu
                            theme='light'
                            defaultSelectedKeys={['1']}
                            mode='inline'
                            items={items}
                        />
                    </div>

                    <Button
                        className={s.button}
                        icon={
                            <Image src='/public/Exit.svg' width={16} preview={false} alt='exit' />
                        }
                    >
                        {!collapsed && <span className={s.button_text}>Выход</span>}
                    </Button>
                </div>
            </Sider>

            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: `${s.trigger} `,
                onClick: () => setCollapsed(!collapsed),
            })}
        </Layout>
    );
};

export default Aside;
