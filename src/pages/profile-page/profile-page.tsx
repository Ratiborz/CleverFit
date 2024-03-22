import { SettingOutlined } from '@ant-design/icons';
import { Aside } from '@components/main-page/sider/sider';
import { Profile } from '@components/profile/profile/profile';
import { positionImage } from '@constants/constants';
import { Button, Layout } from 'antd';

import styles from './profile-page.module.scss';

export const ProfilePage = () => {
    console.log();

    return (
        <Layout className={styles.general_wrapper} style={positionImage}>
            <Aside />
            <Layout className={styles.main_container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Профиль</h1>

                    <div className={styles.wrapper_btn}>
                        <Button
                            className={styles.settings_btn}
                            type='link'
                            icon={<SettingOutlined style={{ color: '#000000D9' }} />}
                            style={{ padding: 0 }}
                        >
                            <span className={styles.settings_text}>Настройки</span>
                        </Button>
                    </div>
                </header>
                <Profile />
            </Layout>
        </Layout>
    );
};
