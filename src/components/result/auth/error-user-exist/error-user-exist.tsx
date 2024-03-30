import { NavLink } from 'react-router-dom';
import { Button, Card, Image, Typography } from 'antd';

import styles from './error-user-exist.module.scss';

export const ErrorUserExist = () => (
    <Card
        className={styles.card}
        bodyStyle={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
    >
        <Image
            src='/result/cancel-cross.svg'
            className={styles.card__img}
            alt='not-valid'
            preview={false}
        />
        <h3 className={styles.card__h3}>Данные не сохранились</h3>
        <Typography className={styles.card__descrip}>
            Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.
        </Typography>
        <Button className={styles.card__btn} data-test-id='registration-back-button'>
            <NavLink to='/auth/registration'>Назад к регистрации</NavLink>
        </Button>
    </Card>
);
