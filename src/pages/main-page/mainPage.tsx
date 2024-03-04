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
import s from './mainPage.module.scss';
import { loadingSelector } from '@constants/selectors/selectors';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
const Loader = React.lazy(() => import('@components/loader/loader'));

const backgroundImage = '/Main_page_light.png';

export const MainPage: React.FC = () => {
    const loading = useAppSelector(loadingSelector);

    if (!isUserAuthLocal() && !isUserAuthSession()) {
        return <Navigate to='/auth' />;
    }

    return (
        <>
            {loading && <Loader />}
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
        </>
    );
};
