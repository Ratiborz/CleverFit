import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { history } from '@redux/configure-store';
import { Layout } from 'antd';

import styles from './password-recovery.module.scss';

export const PasswordRecoveryPage: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        if (!location.state || !location.state.forgotPass) {
            history.push('/auth');
        }
    }, [location.state]);

    return (
        <Layout className={styles.container__recovery}>
            <Outlet />
        </Layout>
    );
};
