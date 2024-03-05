import { Paths } from '@constants/paths';
import { Breadcrumb } from 'antd';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './breadcrumb.module.scss';

const Breadcrumbs: React.FC = () => {
    const location = useLocation();

    return (
        <Breadcrumb className={styles.breadcrumb}>
            <Breadcrumb.Item>
                <NavLink to={Paths.MAIN}>Главная</NavLink>
            </Breadcrumb.Item>
            {location.pathname === Paths.FEEDBACKS && (
                <Breadcrumb.Item>
                    <NavLink to={Paths.FEEDBACKS}>Отзывы пользователей</NavLink>
                </Breadcrumb.Item>
            )}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
