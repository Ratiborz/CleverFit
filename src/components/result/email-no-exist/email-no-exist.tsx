import { Button, Card, Image, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import s from './email-no-exist.module.scss';

export const EmailNoExist = () => {
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
            <h3 className={s.card__h3}>Такой e-mail не зарегистрирован</h3>
            <Typography className={s.card__descrip}>
                Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.
            </Typography>
            <Button className={s.card__btn} data-test-id='check-retry-button'>
                <NavLink to={'/auth'}>Попробовать снова</NavLink>
            </Button>
        </Card>
    );
};
