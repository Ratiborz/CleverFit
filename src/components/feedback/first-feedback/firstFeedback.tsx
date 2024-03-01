import { Button, Card, Typography } from 'antd';
import s from './firstFeedback.module.scss';

export const FirstFeedback = () => {
    return (
        <div className={s.wrapper_feedback}>
            <Card className={s.card}>
                <h2 className={s.card_title}>Оставьте свой отзыв первым</h2>
                <Typography className={s.card_descrip}>
                    Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь
                    своим мнением и опытом с другими пользователями,<br></br> и помогите им сделать
                    правильный выбор.
                </Typography>
            </Card>

            <Button className={s.card_btn}>Написать отзыв</Button>
        </div>
    );
};
