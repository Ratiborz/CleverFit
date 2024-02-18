import { Button, Card, Image, Typography } from 'antd';
import s from './error.module.scss';

export const Error = () => {
    return (
        <Card className={s.card}>
            <Image src='/result/cancel-cross.svg' alt='not-valid' />
            <h3>Данные не сохранились</h3>
            <Typography>
                Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.
            </Typography>
            <Button>Повторить</Button>
        </Card>
    );
};
