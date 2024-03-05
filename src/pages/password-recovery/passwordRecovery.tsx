import { history } from '@redux/configure-store';
import { Layout } from 'antd';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './passwordRecovery.module.scss';

export const PasswordRecoveryPage: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        if (!location.state || !location.state.forgotPass) {
            history.push('/auth');
        }
    }, [location.state, history]);

    return (
        <Layout className={styles.container__recovery}>
            <Outlet />
        </Layout>
    );
};
