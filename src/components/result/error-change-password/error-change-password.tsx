import { history } from '@redux/configure-store';
import { Button, Card, Image, Typography } from 'antd';
import s from './change-password.module.scss';

export const ErrorСhangePassword = () => {
    const handleRetryClick = () => {
        history.push('/auth/change-password', { forgotPass: true });
    };

    return (
        <Card
            className={s.card}
            bodyStyle={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Image
                src='/result/cancel-cross.svg'
                className={s.card__img}
                alt='not-valid'
                preview={false}
            />
            <h3 className={s.card__h3}>Данные не сохранились</h3>
            <Typography className={s.card__descrip}>
                Что-то пошло не так. Попробуйте ещё раз
            </Typography>
            <Button
                className={s.card__btn}
                data-test-id='change-retry-button'
                onClick={handleRetryClick}
            >
                Повторить
            </Button>
        </Card>
    );
};
