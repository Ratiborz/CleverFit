import React, { useEffect } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import { Aside } from '@components/main-page/sider/sider';
import { WithOpenError } from '@components/result/common-modal-result/with-open-error/with-open-error';
import { positionImage } from '@constants/constants';
import { requestTrainingListSelector } from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useGetCatalogTariffListTrainingQuery } from '@redux/api-rtk/training-requests';
import { actions } from '@redux/reducers/common-modal.slice';
import { Button, Layout } from 'antd';

import styles from './training-page.module.scss';

export const TrainingPage = () => {
    const dispatch = useAppDispatch();
    const repeatRequest = useAppSelector(requestTrainingListSelector);
    const { isError, refetch } = useGetCatalogTariffListTrainingQuery();

    useEffect(() => {
        if (repeatRequest) refetch();
        if (isError) dispatch(actions.setErrorWithOpen(isError));
    }, [dispatch, isError, repeatRequest, refetch]);

    return (
        <React.Fragment>
            <WithOpenError />
            <Layout className={styles.general_wrapper} style={positionImage}>
                <Aside />
                <Layout className={styles.main_container}>
                    <div className={styles.header}>
                        <Breadcrumbs />
                        <div className={styles.wrapper_btn}>
                            <Button
                                className={styles.settings_btn}
                                type='link'
                                icon={<SettingOutlined style={{ color: '#000000D9' }} />}
                                style={{ padding: 0 }}
                            >
                                <p className={styles.button_text}>Настройки</p>
                            </Button>
                        </div>
                    </div>
                </Layout>
            </Layout>
        </React.Fragment>
    );
};
