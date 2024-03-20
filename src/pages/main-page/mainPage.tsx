import { Header } from '@components/main-page/header/header';
import { Aside } from '@components/main-page/sider/sider';
import React from 'react';

import { Footer } from '@components/main-page/footer/footer';
import { Main } from '@components/main-page/main/main';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { isUserAuthSession, isUserAuthLocal } from '@utils/storage';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { Navigate } from 'react-router-dom';
import styles from './mainPage.module.scss';
import { positionImage } from '@constants/constants';
import { loadingSelector } from '@constants/selectors';
const Loader = React.lazy(() => import('@components/loader/loader'));

export const MainPage: React.FC = () => {
    const loading = useAppSelector(loadingSelector);

    if (!isUserAuthLocal() && !isUserAuthSession()) {
        return <Navigate to='/auth' />;
    }

    return (
        <>
            {loading && <Loader />}
            <Layout className={styles.general_wrapper} style={positionImage}>
                <Aside />
                <Layout className={styles.main_container}>
                    <Header />
                    <Content>
                        <Main />
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        </>
    );
};
