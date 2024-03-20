import { history } from '@redux/configure-store';
import { Button, Card, Image, Typography } from 'antd';

import styles from './change-password.module.scss';

export const ErrorСhangePassword = () => {
    const handleRetryClick = () => {
        history.push('/auth/change-password', { forgotPass: true });
    };

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
            <h3 className={styles.card__h3}>Данные не сохранились</h3>
            <Typography className={styles.card__descrip}>
                Что-то пошло не так. Попробуйте ещё раз
            </Typography>
            <Button
                className={styles.card__btn}
                data-test-id='change-retry-button'
                onClick={handleRetryClick}
            >
                Повторить
            </Button>
        </Card>
    );
};
