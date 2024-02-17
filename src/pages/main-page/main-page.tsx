import { Header } from '@components/main-page/header/header';
import { Aside } from '@components/main-page/sider/sider';
import React from 'react';

import { Footer } from '@components/main-page/footer/footer';
import { Main } from '@components/main-page/main/main';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import s from './main-page.module.scss';

const backgroundImage = '/Main_page_light.png';

export const MainPage: React.FC = () => {
    return (
        <Layout
            className={s.general_wrapper}
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top',
            }}
        >
            <Aside />
            <Layout className={s.main_container}>
                <Header />
                <Content>
                    <Main />
                </Content>
                <Footer />
            </Layout>
        </Layout>
    );
};
