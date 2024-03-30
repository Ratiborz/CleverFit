import { NavLink } from 'react-router-dom';
import { Button, Card, Image, Typography } from 'antd';

import styles from './success.module.scss';

export const Success = () => (
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
        <h3 className={styles.card__h3}>Регистрация успешна</h3>
        <Typography className={styles.card__descrip}>
            Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.
        </Typography>
        <Button className={styles.card__btn} data-test-id='registration-enter-button'>
            <NavLink to='/auth'>Войти</NavLink>
        </Button>
    </Card>
);
