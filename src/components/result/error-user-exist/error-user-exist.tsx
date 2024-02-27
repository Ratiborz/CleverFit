import { Button, Card, Image, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import s from './error-user-exist.module.scss';

export const ErrorUserExist = () => {
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
                Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.
            </Typography>
            <Button className={s.card__btn} data-test-id='registration-back-button'>
                <NavLink to={'/auth/registration'}>Назад к регистрации</NavLink>
            </Button>
        </Card>
    );
};
