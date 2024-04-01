import { Aside } from '@components/main-page/sider/sider';
import { Layout } from 'antd';

import styles from './training-page.module.scss';

export const TrainingPage = () => {
    return (
        <Layout className={styles.general_wrapper}>
            <Aside />
            <Layout className={styles.main_container}></Layout>
        </Layout>
    );
};
