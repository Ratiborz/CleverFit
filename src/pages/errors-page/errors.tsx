import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { history } from '@redux/configure-store';

import styles from './errors.module.scss';

export const ErrorsPage: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        if (!location.state || !location.state.fromRequest) {
            history.push('/auth');
        }
    }, [location.state]);

    return (
        <div className={styles.container__errors}>
            <Outlet />
        </div>
    );
};
