import React, { useEffect } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import { Aside } from '@components/main-page/sider/sider';
import { WithOpenError } from '@components/result/common-modal-result/with-open-error/with-open-error';
import { ContainerTrainings } from '@components/trainings/container-trainings/container-trainings';
import { positionImage } from '@constants/constants';
import { requestTrainingListSelector } from '@constants/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useGetCatalogTariffListTrainingQuery } from '@redux/api-rtk/training-requests';
import { actions } from '@redux/reducers/common-modal.slice';
import { actions as actionsTraining } from '@redux/reducers/training.slice';
import { Button, Layout } from 'antd';

import styles from './training-page.module.scss';

export const TrainingPage = () => {
    const dispatch = useAppDispatch();
    const repeatRequest = useAppSelector(requestTrainingListSelector);
    const { isError, refetch, data, isSuccess } = useGetCatalogTariffListTrainingQuery();

    useEffect(() => {
        if (isSuccess) dispatch(actionsTraining.setCatalogTariffNames(data));
        if (repeatRequest) {
            refetch();
            dispatch(actionsTraining.setRepeatRequest(false));
        }
        if (isError) dispatch(actions.setErrorWithOpen(isError));
    }, [dispatch, isError, repeatRequest, refetch, data, isSuccess]);

    return (
        <React.Fragment>
            <WithOpenError />
            <Layout className={styles.general_wrapper} style={positionImage}>
                <Aside />
                <Layout className={styles.main_container}>
                    <header className={styles.header}>
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
                    </header>
                    <ContainerTrainings />
                </Layout>
            </Layout>
        </React.Fragment>
    );
};
