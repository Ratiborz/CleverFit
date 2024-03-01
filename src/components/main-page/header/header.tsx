import { SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import s from './header.module.scss';
import Breadcrumbs from '@components/breadcrumb/breadcrumb';

export const Header = () => {
    return (
        <header className={s.header}>
            <Breadcrumbs />
            <div className={s.title_settings}>
                <h1 className={s.title}>
                    Приветствуем тебя в CleverFit — приложении, <br /> которое поможет тебе добиться
                    своей мечты!
                </h1>
                <Button
                    className={s.settings_btn}
                    type='link'
                    icon={<SettingOutlined style={{ color: '#000000D9' }} />}
                    style={{ padding: 0 }}
                >
                    <p className={s.button_text}>Настройки</p>
                </Button>
            </div>
        </header>
    );
};
