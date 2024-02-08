import React from 'react';

import { Header } from '@components/header/header';
import { Layout } from 'antd';

import Aside from '@components/sider/sider';
import s from './main-page.module.scss';

export const MainPage: React.FC = () => {
    return (
        <>
            <Layout className={s.main_container}>
                <Header />
            </Layout>
            <Aside />
        </>
    );
};
