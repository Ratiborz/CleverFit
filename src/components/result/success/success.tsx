import { Button, Card, Image, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import s from './success.module.scss';

export const Success = () => {
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
                src='/result/Suggested-Icon.svg'
                className={s.card__img}
                alt='not-valid'
                preview={false}
            />
            <h3 className={s.card__h3}>Регистрация успешна</h3>
            <Typography className={s.card__descrip}>
                Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.
            </Typography>
            <Button className={s.card__btn} data-test-id='registration-enter-button'>
                <NavLink to={'/auth'}>Войти</NavLink>
            </Button>
        </Card>
    );
};
