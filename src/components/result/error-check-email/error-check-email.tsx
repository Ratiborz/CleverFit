import { Button, Card, Image, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import s from './error-check-email.module.scss';

export const ErrorCheckEmail = () => {
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
                src='/result/Result.svg'
                className={s.card__img}
                alt='not-valid'
                preview={false}
            />
            <h3 className={s.card__h3}>Что-то пошло не так</h3>
            <Typography className={s.card__descrip}>
                Произошла ошибка, попробуйте отправить форму ещё раз.
            </Typography>
            <Button className={s.card__btn} data-test-id='check-back-button'>
                <NavLink to={'/auth'}>Назад</NavLink>
            </Button>
        </Card>
    );
};
