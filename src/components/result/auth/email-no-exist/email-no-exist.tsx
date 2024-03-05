import { Button, Card, Image, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import styles from './email-no-exist.module.scss';

export const EmailNoExist = () => {
    return (
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
            <h3 className={styles.card__h3}>Такой e-mail не зарегистрирован</h3>
            <Typography className={styles.card__descrip}>
                Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.
            </Typography>
            <Button className={styles.card__btn} data-test-id='check-retry-button'>
                <NavLink to={'/auth'}>Попробовать снова</NavLink>
            </Button>
        </Card>
    );
};
