import React from 'react';
import { Navigate } from 'react-router-dom';
import { Footer } from '@components/main-page/footer/footer';
import { Header } from '@components/main-page/header/header';
import { Main } from '@components/main-page/main/main';
import { Aside } from '@components/main-page/sider/sider';
import { positionImage } from '@constants/constants';
import { loadingSelector } from '@constants/selectors';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { isUserAuthLocal, isUserAuthSession } from '@utils/storage';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import styles from './main-page.module.scss';

const Loader = React.lazy(() => import('@components/loader/loader'));

export const MainPage: React.FC = () => {
    const loading = useAppSelector(loadingSelector);

    if (!isUserAuthLocal() && !isUserAuthSession()) {
        return <Navigate to='/auth' />;
    }

    return (
        <React.Fragment>
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
        </React.Fragment>
    );
};
