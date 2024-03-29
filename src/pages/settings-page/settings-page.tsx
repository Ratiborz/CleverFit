import { useEffect } from 'react';
import { Aside } from '@components/main-page/sider/sider';
import { Settings } from '@components/settings/settings/settings';
import { Paths } from '@constants/paths';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useGetCatalogsTariffListQuery } from '@redux/api-rtk/profile-request';
import { history } from '@redux/configure-store';
import { actions } from '@redux/reducers/profile.slice';
import { Layout, PageHeader } from 'antd';

import styles from './settings-page.module.scss';

export const SettingsPage = () => {
    const dispatch = useAppDispatch();
    const { data, isSuccess } = useGetCatalogsTariffListQuery();

    useEffect(() => {
        if (isSuccess) dispatch(actions.setDataTariff(data));
    }, [data, dispatch, isSuccess]);

    const switchToProfile = () => history.push(Paths.PROFILE);

    return (
        <Layout className={styles.general_wrapper}>
            <Aside />
            <Layout className={styles.main_container}>
                <header className={styles.header}>
                    <PageHeader
                        className='site-page-header'
                        onBack={() => switchToProfile()}
                        title='Настройки'
                    />
                </header>
                <Settings />
            </Layout>
        </Layout>
    );
};
