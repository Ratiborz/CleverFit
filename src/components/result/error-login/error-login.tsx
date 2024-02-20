import { Button, Card, Image, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import s from './error-login.module.scss';

export const ErrorLogin = () => {
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
                src='/result/Warning.svg'
                className={s.card__img}
                alt='not-valid'
                preview={false}
            />
            <h3 className={s.card__h3}>Вход не выполнен</h3>
            <Typography className={s.card__descrip}>
                Что-то пошло не так. Попробуйте еще раз
            </Typography>
            <Button className={s.card__btn}>
                <NavLink to={'/auth'}>Повторить</NavLink>
            </Button>
        </Card>
    );
};
