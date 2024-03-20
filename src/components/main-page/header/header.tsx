import { SettingOutlined } from '@ant-design/icons';
import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import { Button } from 'antd';

import styles from './header.module.scss';

export const Header = () => (
        <header className={styles.header}>
            <Breadcrumbs />
            <div className={styles.title_settings}>
                <h1 className={styles.title}>
                    Приветствуем тебя в CleverFit — приложении, <br /> которое поможет тебе добиться
                    своей мечты!
                </h1>
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
    );
