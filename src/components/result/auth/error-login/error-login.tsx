import { NavLink } from 'react-router-dom';
import { Button, Card, Image, Typography } from 'antd';

import styles from './error-login.module.scss';

export const ErrorLogin = () => (
    <Card
        className={styles.card}
        bodyStyle={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
    >
        <Image
            src='/result/Warning.svg'
            className={styles.card__img}
            alt='not-valid'
            preview={false}
        />
        <h3 className={styles.card__h3}>Вход не выполнен</h3>
        <Typography className={styles.card__descrip}>
            Что-то пошло не так. Попробуйте еще раз
        </Typography>
        <Button className={styles.card__btn} data-test-id='login-retry-button'>
            <NavLink to='/auth'>Повторить</NavLink>
        </Button>
    </Card>
);
