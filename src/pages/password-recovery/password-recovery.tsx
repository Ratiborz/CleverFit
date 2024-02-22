import { history } from '@redux/configure-store';
import { Layout } from 'antd';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import s from './password-recovery.module.scss';

export const PasswordRecoveryPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const goToNextStep = (nextStep: string) => {
        history.push(nextStep);
    };

    useEffect(() => {
        if (!location.state || !location.state.forgotPass) {
            history.push('/auth');
        }
    }, [location.state, history]);

    return (
        <Layout className={s.container__recovery}>
            <Outlet />
        </Layout>
    );
};
