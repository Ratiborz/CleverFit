import { history } from '@redux/configure-store';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import s from './errors.module.scss';

export const ErrorsPage: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        if (!location.state || !location.state.fromRequest) {
            history.push('/auth');
        }
    }, [location.state, history]);

    return (
        <div className={s.container__errors}>
            <Outlet />
        </div>
    );
};
