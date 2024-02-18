import { Outlet } from 'react-router-dom';
import s from './errors.module.scss';

export const ErrorsPage: React.FC = () => {
    return (
        <div className={s.container__errors}>
            <Outlet />
        </div>
    );
};
