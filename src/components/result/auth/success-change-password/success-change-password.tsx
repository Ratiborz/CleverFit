import { NavLink } from 'react-router-dom';
import { Button, Card, Image, Typography } from 'antd';

import styles from './success-change-password.module.scss';

export const SuccessChangePassword = () => (
        <Card
            className={styles.card}
            bodyStyle={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Image
                src='/result/Suggested-Icon.svg'
                className={styles.card__img}
                alt='not-valid'
                preview={false}
            />
            <h3 className={styles.card__h3}>Пароль успешно изменен</h3>
            <Typography className={styles.card__descrip}>
                Теперь можно войти в аккаунт, используя свой логин и новый пароль
            </Typography>
            <Button className={styles.card__btn} data-test-id='change-entry-button'>
                <NavLink to="/auth">Вход</NavLink>
            </Button>
        </Card>
    );
