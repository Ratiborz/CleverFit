import { SettingOutlined } from '@ant-design/icons';
import s from './header.module.scss';

export const Header = () => {
    return (
        <header className={s.header}>
            <p className={s.general}>Главная</p>
            <div className={s.title_settings}>
                <h1 className={s.title}>
                    Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей
                    мечты!
                </h1>
                <div className={s.settings}>
                    <SettingOutlined />
                    <p>Настройки</p>
                </div>
            </div>
        </header>
    );
};
